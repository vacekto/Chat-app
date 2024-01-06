import *  as schemas from '../util/zodSchemas'
import { z } from 'zod'

export type TRegisterData = z.infer<typeof schemas.registerDataZodSchema>
export type TLoginData = z.infer<typeof schemas.loginDataZodSchema>
export type TTokenPayload = z.infer<typeof schemas.TokenPayloadZodSchema>