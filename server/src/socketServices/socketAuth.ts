import jwt from 'jsonwebtoken'
import { TSocketIOMiddleware } from "../types"
import { zodSchemas, getTokenPayload } from '@chatapp/shared'

export const auth: TSocketIOMiddleware = (socket, next) => {
    try {
        console.log("socket connecting")
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
        next(err)
    }
}