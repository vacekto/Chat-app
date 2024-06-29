import { ITokenPayload, ITokenPayloadExtended } from "../types"

type TGetJWTPayload = <T extends boolean = false>(
    token: string, extended?: T
) => T extends true ?
    ITokenPayloadExtended :
    ITokenPayload

export const getJWTPayload: TGetJWTPayload = (token, extended) => {
    const tokenPayload = token.split('.')[1]
    const payload = JSON.parse(atob(tokenPayload))
    if (extended) return payload
    delete payload.exp
    delete payload.iat
    return payload
}