import { TUtilMiddleware } from "../types";
import * as MongoAPI from '../Mongo/API'
import { zodSchemas } from '@chatapp/shared'
import BadUserInput from "../util/errorClasses/BadUserInput";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const register: TUtilMiddleware = async (req, res, next) => {
    const registerData = zodSchemas.registerDataZodSchema.parse(req.body)
    const createdUser = await MongoAPI.createUser(registerData)
    createdUser.password = ''
    res.json(createdUser)
}

export const login: TUtilMiddleware = async (req, res) => {
    const loginData = zodSchemas.loginDataZodSchema.parse(req.body)
    const user = await MongoAPI.getUser({ username: loginData.username }, true)
    if (!user) throw new BadUserInput('bad input')
    const isMatch = await bcrypt.compare(loginData.password, user.password)
    if (!isMatch) throw new Error('password missmatch')

    const payload = {
        username: user.username,
        email: user.email
    }

    const token = jwt.sign(
        payload,
        process.env.AUTH_TOKEN_SECRET as string,
        { expiresIn: '7 days' }
    )

    user.password = ''

    res.send({ token })

}

export const test: TUtilMiddleware = async (req, res, next) => {


    res.send('test route hit')
}