import { TUtilMiddleware } from '../types'
import { registerDataZodSchema, loginDataZodSchema } from '@chatapp/shared'

export const loginData: TUtilMiddleware = (req, res, next) => {
    const body = req.body

    const { success } = loginDataZodSchema.safeParse(body)

    if (!success) res.status(400).send('bad input')

    else next()
}

export const registerData: TUtilMiddleware = (req, res, next) => {
    const body = req.body

    const { success } = registerDataZodSchema.safeParse(body)

    if (!success) res.status(400).send('bad input')
    else next()
}