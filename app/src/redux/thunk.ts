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
import { LOCALS_TORE_KEY_LOGGED_IN_USERS } from "../util/constants"

export const loginThunk = createAsyncThunk(
    "userData/login",
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
        return responseData
    }
)

export const registerThunk = createAsyncThunk(
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

export const logoutThunk = createAsyncThunk(
    "userData/logout",
    async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
            method: "POST",
            credentials: 'include'
        })
        localStorage.removeItem(LOCALS_TORE_KEY_LOGGED_IN_USERS)
        socket.disconnect()
    }
)

