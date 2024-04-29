

export const getJWTPayload = (token: string) => {
    const tokenPayload = token.split('.')[1]
    return JSON.parse(atob(tokenPayload))
}