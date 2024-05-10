import { passwordless } from "./passwordlessClient"

export const sendJSON = (
    path: string,
    data: any,
    fetchOptions?: Partial<RequestInit>
) => {
    const url = `${import.meta.env.VITE_SERVER_URL}${path}`
    const options: RequestInit = {
        method: "POST",
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        ...fetchOptions
    }
    return fetch(url, options)
}

export const refreshTokens = async () => {
    const url = `${import.meta.env.VITE_SERVER_URL}/refreshToken`
    const options: RequestInit = {
        method: "POST",
        credentials: 'include',
    }
    let response = await fetch(url, options)
    if (response.status !== 200) return ""
    const { JWT } = await response.json()
    return JWT
}

export const canCreatePasskey = () => {
    if (window.PublicKeyCredential &&
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable &&
        PublicKeyCredential.isConditionalMediationAvailable) {
        // Check if user verifying platform authenticator is available.  
        return Promise.all([
            PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
            PublicKeyCredential.isConditionalMediationAvailable(),
        ]).then(results => {
            if (results.every(r => r === true)) {
                return true
                // Display "Create a new passkey" button  
            }
            return false
        });
    }
}

export const canAuthenticateWithPasskey = async () => {
    if (window.PublicKeyCredential &&
        PublicKeyCredential.isConditionalMediationAvailable) {
        // Check if conditional mediation is available.  
        const isCMA = await PublicKeyCredential.isConditionalMediationAvailable();
        if (isCMA) {
            return true
        }
        return false
    }
}

export const createPasskey = async (username: string, JWT: string) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/createPasskey`
    const options: RequestInit = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ JWT })
    }
    const resposne = await fetch(url, options)
    const { registerToken } = await resposne.json()

    const credentialNickname = `chatApp-${username}`
    const { token, error } = await passwordless.register(registerToken, credentialNickname);
    return { token, error }

}