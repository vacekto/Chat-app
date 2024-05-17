import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { dataActions } from './slice/userData'
import { alertActions } from './slice/alert'
import {
    ILoginResponseData,
    IRegisterResponseData,
    IResponseError,
    PartialBy,
    TLoginData,
    TRegisterData,
    TTokenPayload,
    getJWTPayload,
    isServerError,
} from "@chatapp/shared"
import { passwordless } from "../util/passwordlessClient";
import socket from "../util/socketSingleton"

export const passwordLogin = createAsyncThunk(
    "userData/passwordLogin",
    async (data: TLoginData, { dispatch }) => {
        const res: Response = await sendJSON("/login", data)
        const responseData: ILoginResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) {
            dispatch(alertActions.addAlert({
                id: Date.now(),
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        dispatch(alertActions.addAlert({
            id: Date.now(),
            message: "Login succesfull",
            severity: "success"
        }))
        socket.connect(responseData.jwt)
        dispatch(dataActions.connect(responseData))

        return responseData
    }
)

export const register = createAsyncThunk(
    "userData/register",
    async (data: PartialBy<TRegisterData, "repeatPassword">, { dispatch }) => {
        delete data.repeatPassword
        const res: Response = await sendJSON("/register", data)
        const responseData: IRegisterResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) {
            dispatch(alertActions.addAlert({
                id: Date.now(),
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        dispatch(alertActions.addAlert({
            id: Date.now(),
            message: "Login succesfull",
            severity: "success"
        }))

        dispatch(dataActions.setFormAction("login"))
    }
)

export const logout = createAsyncThunk(
    "userData/logout",
    async (_, { dispatch }) => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
            method: "POST",
            credentials: 'include'
        })
        socket.disconnect()
        dispatch(dataActions.disconnect())
    }
)

export const passkeyLogin = createAsyncThunk(
    "userData/passkeyLogin",
    async (_, { dispatch }) => {
        const { token } = await passwordless.signinWithDiscoverable()
        if (!token) {
            alertActions.addAlert({
                id: Date.now(),
                message: "Could not authenticate, please try again",
                severity: "error"
            })
            throw new Error("passkey signin error")
        }
        const response = await sendJSON("/passkeyLogin", { token })
        const responseData: ILoginResponseData | IResponseError = await response.json()
        if (isServerError(responseData)) {
            dispatch(alertActions.addAlert({
                id: Date.now(),
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        dispatch(alertActions.addAlert({
            id: Date.now(),
            message: "Login succesfull",
            severity: "success"
        }))
        socket.connect(responseData.jwt)
        dispatch(dataActions.connect(responseData))

        return responseData
    }
)


export const OAuthLogin = createAsyncThunk(
    "userData/OAuthLogin",
    async (_, { dispatch }) => {

        const url = `${import.meta.env.VITE_SERVER_URL}/refreshToken`
        const options: RequestInit = {
            method: "POST",
            credentials: 'include'
        }
        const res = await fetch(url, options)
        const { JWT } = await res.json()
        const data: TTokenPayload = getJWTPayload(JWT)
        const loginData: ILoginResponseData = {
            email: data.email,
            jwt: JWT,
            id: data.id,
            username: data.username
        }
        socket.connect(JWT)
        dispatch(dataActions.connect(loginData))

    }
)