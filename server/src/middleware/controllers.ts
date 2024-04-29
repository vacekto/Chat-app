import { TUtilMiddleware } from "../types";
import * as MongoAPI from '../Mongo/API'
import { IUser, zodSchemas } from '@chatapp/shared'
import BadUserInput from "../util/errorClasses/BadUserInput";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { redisClient } from "../Redis/connect";

export const register: TUtilMiddleware = async (req, res, next) => {
    const registerData = zodSchemas.registerApiZS.parse(req.body)
    const createdUser = await MongoAPI.createUser(registerData)
    const POJO: Omit<IUser, "password"> = {
        username: createdUser.username,
        email: createdUser.email
    }

    res.json(POJO)
}

export const logIn: TUtilMiddleware = async (req, res) => {
    const loginData = zodSchemas.loginApiZS.parse(req.body)
    const user = await MongoAPI.getUser({ username: loginData.username })
    if (!user) throw new BadUserInput('bad input')
    const isMatch = await bcrypt.compare(loginData.password, user.password)
    if (!isMatch) throw new BadUserInput('password missmatch')

    const payload = {
        username: user.username,
        email: user.email
    }

    const accessToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: '10min' }
    )

    const refreshToken = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: '7 days' }
    )

    res.cookie(
        "chatAppRefreshToken",
        refreshToken,
        {
            httpOnly: true,
            sameSite: "strict"
        })

    await redisClient.set(user.username, refreshToken);

    const userData = {
        username: user.username,
        email: user.email,
        jwt: accessToken
    }

    res.send(userData)
}

export const logOut: TUtilMiddleware = async (req, res) => {
    // res.clearCookie(name, [ options ])
    res.send()
}

export const test: TUtilMiddleware = async (req, res, next) => {
    console.log(redisClient.isOpen)
    console.log(req.cookies)
    res.send('test route hit')
}
