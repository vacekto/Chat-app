import jwt from 'jsonwebtoken'
import { TSocketIOMiddleware } from "../types"
import { zodSchemas, getTokenPayload } from '@chatapp/shared'
import AuthTokenError from "../util/errorClasses/AuthTokenError";

export const auth: TSocketIOMiddleware = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        jwt.verify(
            token,
            process.env.AUTH_TOKEN_SECRET as string,
        )

        const payload = getTokenPayload(token)
        const userData = zodSchemas.tokenPayloadZS.parse(payload)

        socket.data.username = userData.username
        next()

    } catch (err: any) {

        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError" ||
            err.name === "NotBeforeError"
        ) {
            err = new AuthTokenError()
        }
        next(err)
    }
}