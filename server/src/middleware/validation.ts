import { TUtilMiddleware } from '@/src/util/types'
import { registerDataSchema, loginDataSchema } from '@chatapp/shared'

export const loginData: TUtilMiddleware = (req, res, next) => {
    const body = req.body

    const { success } = loginDataSchema.safeParse(body)

    if (!success) res.status(400).send('bad input')

    else next()
}

export const registerData: TUtilMiddleware = (req, res, next) => {
    const body = req.body

    const { success } = registerDataSchema.safeParse(body)

    if (!success) res.status(400).send('bad input')
    else next()
}