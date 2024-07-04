import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserData } from '@chatapp/shared'
import { TFormAction } from '../../pages/AppForm'
import { LS_CHAP_APP_ACCESS_TOKEN } from '../../util/constants'
import socket from '../../util/socket'

export interface IUserDataState extends IUserData {
    socketConnected: boolean,
    formAction: TFormAction,
    accessToken: string,
    generalChatUsers: string[],
}

const initialState: IUserDataState = {
    socketConnected: false,
    username: "",
    email: "",
    formAction: "loginAction",
    accessToken: "",
    generalChatUsers: [],
    id: ""
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setSocketConnected: (state: Draft<IUserDataState>, action: PayloadAction<boolean>) => {
            state.socketConnected = action.payload
        },
        setFormAction: ((state: Draft<IUserDataState>, action: PayloadAction<TFormAction>) => {
            state.formAction = action.payload
        }),
        setUserData: ((state: Draft<IUserDataState>, action: PayloadAction<IUserData>) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.id = action.payload.id
        }),
        /**
         * expects JWT access token as payload
        */
        login: ((state: Draft<IUserDataState>, action: PayloadAction<string>) => {
            const token = action.payload
            state.accessToken = token
            localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, token)
            socket.connect(token)
        }),
        logout: ((state: Draft<IUserDataState>) => {
            if (socket.connected) socket.disconnect()
            localStorage.removeItem(LS_CHAP_APP_ACCESS_TOKEN)
            state = initialState
        }),
    },
})

export const selectUsername = (state: IUserDataState) => state.username;

export const dataActions = userDataSlice.actions
export default userDataSlice.reducer
