import { ITokenPayload, REFRESH_TOKEN_COOKIE, getTokenPayload, } from "@chatapp/shared"
import { TUtilMiddleware } from "../types"
import { setRefreshTokenCookie, signTokens } from "../util/functions"
import { redisClient } from "../Redis/connect"
import jwt from 'jsonwebtoken'

export const refreshToken: TUtilMiddleware = async (req, res) => {
    const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE]
    if (!refreshToken) {
        res.status(400).send("no refresh token")
        return
    }
    jwt.verify(
        refreshToken,
        process.env.AUTH_TOKEN_SECRET as string,
    )

    const payload: ITokenPayload = getTokenPayload(refreshToken)

    const redisToken = await redisClient.get(payload.username);
    if (refreshToken !== redisToken) {
        res.clearCookie(REFRESH_TOKEN_COOKIE)
        res.redirect('back')
        return
    }

    const {
        accessToken: newAccess,
        refreshToken: newRefresh
    } = signTokens(payload)

    setRefreshTokenCookie(res, newRefresh)
    await redisClient.set(payload.username, newRefresh);
    res.send({ JWT: newAccess })
}