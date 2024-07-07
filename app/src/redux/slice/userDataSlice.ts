import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserData } from '@chatapp/shared'
import { TFormAction } from '../../pages/AppForm'
import { LS_CHAP_APP_ACCESS_TOKEN } from '../../util/constants'
import socket from '../../util/socket'
import { logout } from '../thunk'


type TAccessToken = string
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
        setAccessToken: (state: Draft<IUserDataState>, action: PayloadAction<TAccessToken>) => {
            state.accessToken = action.payload
        },

        login: ((state, action: PayloadAction<TAccessToken>) => {
            const token = action.payload
            state.accessToken = token
            localStorage.setItem(LS_CHAP_APP_ACCESS_TOKEN, token)
            socket.connect(token)
        }),

    },
    extraReducers: (builder) => {
        builder.addCase(logout.fulfilled, state => {
            state
            state = initialState
        })
    },
})


export const dataActions = userDataSlice.actions
export default userDataSlice.reducer
