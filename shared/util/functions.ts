import { IResponseError } from "../types";

export const getJWTPayload = (token: string) => {
    const tokenPayload = token.split('.')[1]
    return JSON.parse(atob(tokenPayload))
}

export function isServerError(data: Object): data is IResponseError {
    return typeof (data as any).errorMessage === "string"
}