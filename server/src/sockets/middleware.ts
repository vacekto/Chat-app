import jwt from 'jsonwebtoken'
import { TSocketIOMiddleware } from "../types"
import { zodSchemas, getJWTPayload } from '@chatapp/shared'

export const auth: TSocketIOMiddleware = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;

        jwt.verify(
            token,
            process.env.AUTH_TOKEN_SECRET as string,
        )

        const payload = getJWTPayload(token)
        const userData = zodSchemas.tokenPayloadZS.parse(payload)

        socket.data.username = userData.username
        next()

    } catch (err: any) {
        // should log error in prod
        next(err)
    }
}