

/**
 * throws error of invalid token format or invalid paylod JSON
 * @returns JSON parsed payload
 */


export const getJWTPayload = (token: string) => {
    const tokenPayload = token.split('.')[1]
    return JSON.parse(atob(tokenPayload))
}