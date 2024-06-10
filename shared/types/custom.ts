
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
