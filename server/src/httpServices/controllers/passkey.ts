import { ILoginResponseData, ITokenPayload, getTokenPayload } from "@chatapp/shared"
import MongoAPI from "../../Mongo/API"
import { TUtilMiddleware } from "../../types"
import { setRefreshTokenCookie, signTokens } from "../../util/functions"
import { redisClient } from "../../Redis/connect"
import jwt from 'jsonwebtoken'

export const createPassKey: TUtilMiddleware = async (req, res) => {
    const { JWT } = req.body
    jwt.verify(
        JWT,
        process.env.AUTH_TOKEN_SECRET as string,
    )
    const { username, id } = getTokenPayload(JWT)

    const passkeyPayload = {
        userId: id,
        username: username
    };

    const url = `${process.env.PASSKEY_API_URL}/register/token`
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify(passkeyPayload),
        headers: {
            'ApiSecret': `${process.env.PASSKEY_PRIVATE_KEY!}`,
            'Content-Type': 'application/json'
        }
    }

    const response = await fetch(url, options)
    const { token } = await response.json()
    res.send({ registerToken: token })
}

export const passkeyLogin: TUtilMiddleware = async (req, res) => {
    const token = req.body.token
    const url = `${process.env.PASSKEY_API_URL}/signin/verify`
    const options: RequestInit = {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
            'ApiSecret': process.env.PASSKEY_PRIVATE_KEY!,
            'Content-Type': 'application/json'
        }
    }

    const verifyResponse = await fetch(url, options);
    const body = await verifyResponse.json();
    if (!body.success) throw new Error("some passkey login error")
    let user = await MongoAPI.getUserLean({ id: body.userId })

    if (!user) throw new Error("Passkey is valid but user was not found in DB")

    const payload: ITokenPayload = {
        email: user.email,
        id: user.id,
        username: user.username,
    }

    const { accessToken, refreshToken } = signTokens(payload)
    setRefreshTokenCookie(res, refreshToken)
    await redisClient.set(user.username, refreshToken);

    const response: ILoginResponseData = {
        accessToken: accessToken,
    }

    res.send(response)
}