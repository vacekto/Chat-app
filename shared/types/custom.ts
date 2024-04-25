export interface IUser {
    username: string
    email: string
    password: string
}

export type TPartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type TRequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

export interface IResponseError {
    message: string,
    [props: string]: any
}