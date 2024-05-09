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
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/refreshToken`, {
        method: "POST",
        credentials: 'include',
    })

    if (response.status !== 200) return ""
    const { JWT } = await response.json()
    return JWT
}