import { ITokenPayload, getTokenPayload } from "@chatapp/shared"
import MongoAPI from "../../Mongo/API"
import { TUtilMiddleware } from "../../types"
import { getGoogleOAuthTokens, setRefreshTokenCookie, signTokens } from "../../util/functions"
import { redisClient } from "../../Redis/connect"
import { GOOGLE_OAUTH_URL } from "../../util/config"

export const OAuth2Callback: TUtilMiddleware = async (req, res) => {
    const code = req.query.code as string
    const { access_token, id_token } = await getGoogleOAuthTokens(code)

    const OAuthPayload = getTokenPayload(id_token)
    const user = await MongoAPI.getUser({ email: OAuthPayload.email }, true)
    const redirectUrl = process.env.NODE_ENV === "development" ?
        process.env.VITE_APP_URL as string :
        process.env.VITE_SERVER_URL as string

    if (!user) {
        res.redirect(`${redirectUrl}/notRegistered`)
        return
    }
    const payload: ITokenPayload = {
        email: user.email,
        id: user.id,
        username: user.username
    }

    const { refreshToken: newRefreshToken } = signTokens(payload)

    setRefreshTokenCookie(res, newRefreshToken)
    await redisClient.set(payload.username, newRefreshToken);

    res.redirect(redirectUrl)
}

export const googleLogin: TUtilMiddleware = async (req, res, next) => {
    res.redirect(GOOGLE_OAUTH_URL)
}