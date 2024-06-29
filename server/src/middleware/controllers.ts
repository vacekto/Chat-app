import { TUtilMiddleware } from "../types";
import MongoAPI from "../Mongo/API/index";
import { ILoginResponseData, zodSchemas, IRegisterResponseData, ITokenPayload, getJWTPayload, REFRESH_TOKEN } from '@chatapp/shared'
import BadUserInput from "../util/errorClasses/BadUserInput";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { redisClient } from "../Redis/connect";
import { JWT_ACCESS_VALIDATION_LENGTH, JWT_REFRESH_VALIDATION_LENGTH } from "@chatapp/shared"
import { COOKIE_SAMESITE, GOOGLE_OAUTH_URL } from "../util/config";
import { getGoogleOAuthTokens } from "../util/functions";

export const createPassKey: TUtilMiddleware = async (req, res) => {
    const { JWT } = req.body
    jwt.verify(
        JWT,
        process.env.AUTH_TOKEN_SECRET as string,
    )
    const { username, id } = getJWTPayload(JWT)

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
    const user = await MongoAPI.getUser({ id: body.userId }, true)
    if (!user) throw new Error("some passkey login error")

    const payload: ITokenPayload = {
        email: user.email,
        id: user.id,
        username: user.username,
    }

    const accessToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_ACCESS_VALIDATION_LENGTH }
    )

    const refreshToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_REFRESH_VALIDATION_LENGTH }
    )
    res.cookie(
        REFRESH_TOKEN,
        refreshToken,
        {
            httpOnly: true,
            sameSite: COOKIE_SAMESITE,
            maxAge: JWT_REFRESH_VALIDATION_LENGTH * 1000
        })
    await redisClient.set(user.username, refreshToken);

    const response: ILoginResponseData = {
        username: user.username,
        email: user.email,
        jwt: accessToken,
        id: user.id,
    }

    res.send(response)
}

export const register: TUtilMiddleware = async (req, res, next) => {
    const registerData = zodSchemas.registerApiZS.parse(req.body)
    const user = await MongoAPI.createUser(registerData)

    const response: IRegisterResponseData = {
        username: user.username,
        email: user.email,
        id: user.id,
    }
    res.send(response)
}

export const passwordLogin: TUtilMiddleware = async (req, res) => {
    const loginData = zodSchemas.loginApiZS.parse(req.body)
    const user = await MongoAPI.getUser({ username: loginData.username })
    if (!user) throw new BadUserInput(`User with username ${loginData.username} does not exist.`)
    const isMatch = await bcrypt.compare(loginData.password, user.password!)
    if (!isMatch) throw new BadUserInput('Incorrect password')
    const payload = {
        username: user.username,
        email: user.email,
        id: user.id
    }
    const accessToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_ACCESS_VALIDATION_LENGTH }
    )
    const refreshToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_REFRESH_VALIDATION_LENGTH }
    )
    res.cookie(
        REFRESH_TOKEN,
        refreshToken,
        {
            httpOnly: true,
            sameSite: COOKIE_SAMESITE,
            maxAge: JWT_REFRESH_VALIDATION_LENGTH * 1000
        })

    await redisClient.set(user.username, refreshToken);

    const response: ILoginResponseData = {
        username: user.username,
        email: user.email,
        jwt: accessToken,
        id: user.id,
    }

    res.send(response)
}

export const refreshToken: TUtilMiddleware = async (req, res) => {
    const refreshToken = req.cookies[REFRESH_TOKEN]
    if (!refreshToken) {
        res.status(400).send("no refresh token")
        return
    }
    jwt.verify(
        refreshToken,
        process.env.AUTH_TOKEN_SECRET as string,
    )
    let payload: ITokenPayload = getJWTPayload(refreshToken)
    payload = {
        username: payload.username,
        email: payload.email,
        id: payload.id
    }
    const redisRefreshToken = await redisClient.get(payload.username);
    if (refreshToken !== redisRefreshToken) {

        res.clearCookie(REFRESH_TOKEN)
        res.redirect('back')
        return
    }
    const newAccessToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_ACCESS_VALIDATION_LENGTH }
    )
    const newRefreshToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_REFRESH_VALIDATION_LENGTH }
    )
    res.cookie(
        REFRESH_TOKEN,
        newRefreshToken,
        {
            httpOnly: true,
            sameSite: COOKIE_SAMESITE,
            maxAge: JWT_REFRESH_VALIDATION_LENGTH * 1000
        })

    await redisClient.set(payload.username, newRefreshToken);
    res.send({ JWT: newAccessToken })
}

export const logout: TUtilMiddleware = async (req, res) => {
    const token = req.cookies[REFRESH_TOKEN]
    const paylaod: ITokenPayload = getJWTPayload(token)
    res.clearCookie(REFRESH_TOKEN)
    await redisClient.del(paylaod.username);
    res.status(200).send(paylaod)
}

export const OAuth: TUtilMiddleware = async (req, res) => {
    const code = req.query.code as string
    const { access_token, id_token } = await getGoogleOAuthTokens(code)
    const OAuthPayloadayload = getJWTPayload(id_token)
    const user = await MongoAPI.getUser({ email: OAuthPayloadayload.email }, true)
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
    const newRefreshToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: JWT_REFRESH_VALIDATION_LENGTH }
    )
    res.cookie(

        REFRESH_TOKEN,
        newRefreshToken,
        {
            httpOnly: true,
            sameSite: COOKIE_SAMESITE,
            maxAge: JWT_REFRESH_VALIDATION_LENGTH * 1000
        }
    )

    await redisClient.set(payload.username, newRefreshToken);

    res.redirect(redirectUrl)
}

export const test: TUtilMiddleware = async (req, res, next) => {
    // await MongoAPI.createDirectChannel(["pumpkinSlayer", "nekdodalsi"])
    const user = await MongoAPI.getUser({
        username: "hahaha"
    })
    console.log(user)
    // const user = await MongoAPI.users.getUser({ username: "magicTurtle" }, true)
    // if (user) {
    //     const json = JSON.stringify(user)
    //     console.log(json)
    // }
    // res.send()
}

export const googleLogin: TUtilMiddleware = async (req, res, next) => {
    res.redirect(GOOGLE_OAUTH_URL)
}