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
    isServerError,
} from "@chatapp/shared"
import socket from "../util/socketSingleton"
import { CHAP_APP_LAST_ONLINE } from "../util/constants"
import { passwordless } from "../util/passwordlessClient";

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

        dispatch(dataActions.login(responseData))

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
    async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
            method: "POST",
            credentials: 'include'
        })
        localStorage.removeItem(CHAP_APP_LAST_ONLINE)
        socket.disconnect()
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

        dispatch(dataActions.login(responseData))

        return responseData
    }
)

