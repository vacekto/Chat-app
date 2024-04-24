import *  as schemas from '../util/zodSchemas'
import { z } from 'zod'

export type TRegisterData = z.infer<typeof schemas.registerDataZS>
export type TLoginData = z.infer<typeof schemas.loginDataZS>
export type TTokenPayload = z.infer<typeof schemas.tokenPayloadZS>