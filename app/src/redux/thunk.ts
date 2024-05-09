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
import { Client } from '@passwordlessdev/passwordless-client';


const p = new Client({
    apiKey: import.meta.env.VITE_PASSKEY_PUBLIC_KEY
});

export const bitWardenLoginThunk = createAsyncThunk(
    "userData/bitWardenLogin",
    async (username: string) => {
        const a = await p.isBrowserSupported()
        const b = await p.isPlatformSupported()
        const c = await p.isAutofillSupported()
        console.log(a, b, c)
        const { token } = await p.signinWithAutofill();
        const url = import.meta.env.VITE_SERVER_URL // Your backend.
        const response = await sendJSON(url + "/bitWardenLogin", token)
        const verifiedUser = await response.json()
        console.log(verifiedUser.outcome)
    }
)

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
        console.log("thunk json: ", responseData)
        if (isServerError(responseData)) {
            dispatch(alertActions.addAlert({
                id: Date.now(),
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        await p.register(responseData.passkeyToken, `chatapp-${responseData.username}`)


        dispatch(alertActions.addAlert({
            id: Date.now(),
            message: "Login succesfull",
            severity: "success"
        }))
        1
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
        localStorage.removeItem(CHAP_APP_LAST_ONLINE)
        socket.disconnect()
    }
)

