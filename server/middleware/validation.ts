import { TMiddleware } from '@/util/types'
import { z } from 'zod'
import { regex } from '@chatapp/shared'

export const loginData: TMiddleware = (req, res, next) => {
    const body = req.body
    const loginDataSchema = z.object({
        username: z.string().regex(regex.username),
        password: z.string().regex(regex.password)
    })

    const { success } = loginDataSchema.safeParse(body)

    if (!success) res.status(400).send('invalid data')
    else next()
}

export const registerData: TMiddleware = (req, res, next) => {
    const body = req.body
    const registerDataSchema = z.object({
        username: z.string().regex(regex.username),
        password: z.string().regex(regex.password),
        email: z.string().regex(regex.email),
    })
    const { success } = registerDataSchema.safeParse(body)

    if (!success) res.status(400).send('invalid data')
    else next()
}