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

export const createPasskey = async (username: string, JWT: string) => {
    const url = `${import.meta.env.VITE_SERVER_URL}/createPasskey`
    const options: RequestInit = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken })
    }
    const resposne = await fetch(url, options)
    const data = await resposne.json()
    return data
}