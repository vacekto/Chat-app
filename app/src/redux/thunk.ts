import { createAsyncThunk } from "@reduxjs/toolkit"
import { refreshTokens, sendJSON } from "../util/functions"
import { dataActions } from './slice/userDataSlice'
import { alertActions } from './slice/alertSlice'
import {
    ILoginResponseData,
    IMessage,
    IRegisterResponseData,
    IResponseError,
    PartialBy,
    TLoginData,
    TRegisterData,
    isServerError,
} from "@chatapp/shared"
import { passwordless } from "../util/passwordlessClient";
import socket from "../util/socket"
import { TRootState } from "./store"
import { messagesActions } from "./slice/messagesSlice"
import { LS_CHAP_APP_ACCESS_TOKEN } from "../util/constants"

export const passwordAuth = createAsyncThunk<void, TLoginData, { state: TRootState }>(
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

        thunkAPI.dispatch(dataActions.login(responseData.accessToken))
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
    async () => {
        await fetch(`${import.meta.env.VITE_SERVER_URL}/logout`, {
            method: "POST",
            credentials: 'include'
        })

        if (socket.connected) socket.disconnect()
        localStorage.removeItem(LS_CHAP_APP_ACCESS_TOKEN)
    }
)

export const passkeyAuth = createAsyncThunk<void, void, { state: TRootState }>(
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

        thunkAPI.dispatch(dataActions.login(responseData.accessToken))
    }
)


export const GoogleAuth = createAsyncThunk<void, void, { state: TRootState }>(
    "userData/OAuthLogin",
    async (_, thunkAPI) => {
        const fetchedData = await refreshTokens()
        if (fetchedData.ok)
            thunkAPI.dispatch(dataActions.login(fetchedData.res.accessToken))
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

        socket.emit("requestDirectChanelByUsernames", usernames, (channel) => {
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

export const addDirectMessage = createAsyncThunk<IMessage, IMessage, { state: TRootState }>(
    "userData/logout",
    async (message, thunkAPI) => {
        const state = thunkAPI.getState()
        const index = state.message.directChannels.findIndex(c => c.id === message.channelId)
        if (index > -1) return message
        socket.emit("requestDirectChanelById", message.channelId, channel => {
            if (!channel) return
            thunkAPI.dispatch(messagesActions.addDirectChannel({
                channelId: channel.id,
                messages: channel.messages,
                users: channel.users,
                clientUsername: state.userData.username
            }))
        })
        return message
    }
)