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