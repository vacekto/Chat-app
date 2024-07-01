import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { dataActions } from './slice/userDataSlice'
import { alertActions } from './slice/alertSlice'
import {
    ILoginResponseData,
    IRegisterResponseData,
    IResponseError,
    PartialBy,
    TLoginData,
    TRegisterData,
    ITokenPayload,
    getTokenPayload,
    isServerError,
} from "@chatapp/shared"
import { passwordless } from "../util/passwordlessClient";
import socket from "../util/socket"
import { LS_CHAP_APP_ACCESS_TOKEN } from "../util/constants"
import { TRootState } from "./store"
import { messagesActions } from "./slice/messagesSlice"

export const passwordLogin = createAsyncThunk<ILoginResponseData, TLoginData, { state: TRootState }>(
    "userData/passwordLogin",
    async (args, thunkAPI) => {
        const res: Response = await sendJSON("/passwordLogin", args)
        const responseData: ILoginResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) {
            thunkAPI.dispatch(alertActions.addAlert({
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        socket.connect(responseData.jwt)
        localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, responseData.jwt)
        thunkAPI.dispatch(dataActions.connect(responseData))
        thunkAPI.dispatch(alertActions.addAlert({
            message: "Login succesfull",
            severity: "success"
        }))

        return responseData
    }
)

export const register = createAsyncThunk<void, PartialBy<TRegisterData, "repeatPassword">, { state: TRootState }>(
    "userData/register",
    async (args, thunkAPI) => {
        delete args.repeatPassword
        const res: Response = await sendJSON("/register", args)
        const responseData: IRegisterResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) {
            thunkAPI.dispatch(alertActions.addAlert({
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        thunkAPI.dispatch(dataActions.setFormAction("loginAction"))
        thunkAPI.dispatch(alertActions.addAlert({
            message: "Registered succesfully",
            severity: "success"
        }))
    }
)

export const logout = createAsyncThunk<void, void, { state: TRootState }>(
    "userData/logout",
    async (_, thunkAPI) => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
            method: "POST",
            credentials: 'include'
        })
        socket.disconnect()
        localStorage.removeItem(LS_CHAP_APP_ACCESS_TOKEN)
        thunkAPI.dispatch(dataActions.disconnect())
        thunkAPI.dispatch(alertActions.addAlert({
            message: "You are now logged out",
            severity: "success"
        }))
    }
)

export const passkeyLogin = createAsyncThunk<ILoginResponseData, void, { state: TRootState }>(
    "userData/passkeyLogin",
    async (_, thunkAPI) => {
        const { token } = await passwordless.signinWithDiscoverable()
        if (!token) {
            alertActions.addAlert({
                message: "Could not authenticate, please try again",
                severity: "error"
            })
            throw new Error("passkey signin error")
        }
        const response = await sendJSON("/passkeyLogin", { token })
        const responseData: ILoginResponseData | IResponseError = await response.json()
        if (isServerError(responseData)) {
            thunkAPI.dispatch(alertActions.addAlert({
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        thunkAPI.dispatch(alertActions.addAlert({
            message: "Login succesfull",
            severity: "success"
        }))
        socket.connect(responseData.jwt)
        localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, responseData.jwt)
        thunkAPI.dispatch(dataActions.connect(responseData))

        return responseData
    }
)


export const OAuthLogin = createAsyncThunk<void, void, { state: TRootState }>(
    "userData/OAuthLogin",
    async (_, thunkAPI) => {

        const url = `${import.meta.env.VITE_SERVER_URL}/refreshToken`
        const options: RequestInit = {
            method: "POST",
            credentials: 'include'
        }
        const res = await fetch(url, options)
        const { JWT } = await res.json()
        const data: ITokenPayload = getTokenPayload(JWT)
        const loginData: ILoginResponseData = {
            email: data.email,
            jwt: JWT,
            id: data.id,
            username: data.username
        }
        socket.connect(JWT)
        localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, loginData.jwt)
        thunkAPI.dispatch(dataActions.connect(loginData))
    }
)

export const fetchDirectChannel = createAsyncThunk<void, [string, string], { state: TRootState }>(
    "message/selectDirectChannel",
    async (usernames, thunkAPI) => {
        const state = thunkAPI.getState()
        const channel = state.message.directChannels.find(c => {
            return (
                c.users.includes(usernames[0]) &&
                c.users.includes(usernames[1])
            )
        })

        if (channel) {
            thunkAPI.dispatch(messagesActions.selectDirectChannel(channel.id))
            return
        }

        socket.emit("requestDirectChanel", usernames, (channel) => {
            console.log("channel")
            thunkAPI.dispatch(messagesActions.addDirectChannel({
                channelId: channel.id,
                messages: channel.messages,
                users: channel.users,
                clientUsername: state.userData.username
            }))
            thunkAPI.dispatch(messagesActions.selectDirectChannel(channel.id))
        })
    }
)