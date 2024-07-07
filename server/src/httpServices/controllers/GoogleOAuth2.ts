import { ITokenPayload, getTokenPayload } from "@chatapp/shared"
import MongoAPI from "../../Mongo/API"
import { TUtilMiddleware } from "../../types"
import { getGoogleOAuthTokens, setRefreshTokenCookie, signTokens } from "../../util/functions"
import { redisClient } from "../../Redis/connect"
import { GOOGLE_OAUTH_URL } from "../../util/config"

export const OAuth2Callback: TUtilMiddleware = async (req, res) => {
    const code = req.query.code as string
    const { id_token } = await getGoogleOAuthTokens(code)

    const OAuthPayload = getTokenPayload(id_token)
    const user = await MongoAPI.getUserLean({ email: OAuthPayload.email })

    const redirectDomain = process.env.NODE_ENV === "development" ?
        `${process.env.VITE_APP_URL}` :
        `${process.env.VITE_SERVER_URL}`

    if (!user) {
        res.redirect(`${redirectDomain}/notRegistered`)
        return
    }
    const payload: ITokenPayload = {
        email: user.email,
        id: user.id,
        username: user.username
    }

    const { refreshToken } = signTokens(payload)

    setRefreshTokenCookie(res, refreshToken)
    await redisClient.set(payload.username, refreshToken);

    res.redirect(redirectDomain)
}

export const googleLogin: TUtilMiddleware = async (req, res, next) => {
    res.redirect(GOOGLE_OAUTH_URL)
}