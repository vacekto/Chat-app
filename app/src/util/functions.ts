import { IRefreshTokenResponse, TFuncResult } from "@chatapp/shared"
import { passwordless } from "./passwordlessClient"
import { ProblemDetails } from "@passwordlessdev/passwordless-client/dist/types"

/**
 * @param path must start with /
 */
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

export const refreshTokens = async (): Promise<TFuncResult<IRefreshTokenResponse, string>> => {
    const url = `${import.meta.env.VITE_SERVER_URL}/refreshToken`
    const options: RequestInit = {
        method: "POST",
        credentials: 'include',
    }
    let response = await fetch(url, options)
    if (response.status === 400) return {
        ok: false,
        res: "no refresh token"
    }
    const data: IRefreshTokenResponse = await response.json()
    return {
        ok: true,
        res: data
    }
}

export const createPasskey = async (username: string, JWT: string): Promise<TFuncResult<string, ProblemDetails>> => {
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

    if (error) return {
        res: error,
        ok: false,
    }

    return {
        res: token,
        ok: true,
    }
}