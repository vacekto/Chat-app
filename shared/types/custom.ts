import *  as schemas from '../util/zodSchemas'
import { z } from 'zod'
export interface IUser {
    username: string
    email: string
    password?: string
    id: string
}

export type PartialBy<T, P extends keyof T> = Omit<T, P> & Partial<Pick<T, P>>
export type RequiredBy<T, P extends keyof T> = Omit<T, P> & Required<Pick<T, P>>

export interface IResponseError {
    errorMessage: string,
    [props: string]: any
}

export interface IRegisterResponseData {
    username: string,
    email: string,
    id: string
}

export interface ILoginResponseData {
    username: string,
    email: string,
    jwt: string,
    id: string,
}

export type TRegisterData = z.infer<typeof schemas.registerFormZS>
export type TLoginData = z.infer<typeof schemas.loginFormZS>
export interface ITokenPayload extends z.infer<typeof schemas.tokenPayloadZS> { }
export interface ITokenPayloadExtended extends ITokenPayload {
    exp: number,
    iat: number,
}

export interface IClientDirectChannel extends z.infer<typeof schemas.clientDirectChannel> { }
export interface IDirectChannel extends z.infer<typeof schemas.directChannel> { }
export interface IMessage extends z.infer<typeof schemas.message> { }
export interface IGroupChannel extends z.infer<typeof schemas.groupChannel> { }

