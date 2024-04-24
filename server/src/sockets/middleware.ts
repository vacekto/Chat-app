import jwt from 'jsonwebtoken'
import { TIOSocket, TSocketIOMiddleware } from "../types"
import { zodSchemas } from '@chatapp/shared'

export const auth: TSocketIOMiddleware = (socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        jwt.verify(
            token,
            process.env.AUTH_TOKEN_SECRET as string,
        )

        const tokenPayload = token.split('.')[1]
        const decodedPayload = JSON.parse(atob(tokenPayload))
        const username = zodSchemas.tokenPayloadZS.parse(decodedPayload).username

        socket.data.username = username
        next()

    } catch (err: any) {
        next(err)
    }
}

