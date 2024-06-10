import *  as schemas from '../util/zodSchemas'
import { z } from 'zod'

export type TRegisterData = z.infer<typeof schemas.registerFormZS>
export type TLoginData = z.infer<typeof schemas.loginFormZS>
export type TTokenPayload = z.infer<typeof schemas.tokenPayloadZS>

export interface IClientDirectChannel extends z.infer<typeof schemas.clientDirectChannel> { }
export interface IDirectChannel extends z.infer<typeof schemas.directChannel> { }
export interface IMessage extends z.infer<typeof schemas.message> { }
export interface IGroupChannel extends z.infer<typeof schemas.groupChannel> { }

