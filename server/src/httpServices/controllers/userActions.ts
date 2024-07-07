import { ILoginResponseData, IRegisterResponseData, ITokenPayload, REFRESH_TOKEN_COOKIE, getTokenPayload, zodSchemas } from "@chatapp/shared"
import MongoAPI from "../../Mongo/API"
import { TUtilMiddleware } from "../../types"
import { setRefreshTokenCookie, signTokens } from "../../util/functions"
import { redisClient } from "../../Redis/connect"
import BadUserInputError from "../../util/errorClasses/BadUserInput"
import bcrypt from 'bcrypt';

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
    if (!user) throw new BadUserInputError(`User with username ${loginData.username} does not exist.`)
    const isMatch = await bcrypt.compare(loginData.password, user.password!)
    if (!isMatch) throw new BadUserInputError('Incorrect password')
    const payload: ITokenPayload = {
        username: user.username,
        email: user.email,
        id: user.id
    }

    const { accessToken, refreshToken } = signTokens(payload)

    setRefreshTokenCookie(res, refreshToken)
    await redisClient.set(user.username, refreshToken);

    const response: ILoginResponseData = {
        accessToken: accessToken,
    }

    res.send(response)
}

export const logout: TUtilMiddleware = async (req, res) => {
    const token = req.cookies[REFRESH_TOKEN_COOKIE]
    if (!token) {
        res.status(200).send()
        return
    }
    const paylaod: ITokenPayload = getTokenPayload(token)
    res.clearCookie(REFRESH_TOKEN_COOKIE, {
        sameSite: "lax"
    })
    await redisClient.del(paylaod.username);
    res.status(200).send()
}

export const test: TUtilMiddleware = async (req, res, next) => {
    const users = await MongoAPI.getUsersLean("*")
    res.send(users)
}