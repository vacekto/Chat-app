import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginThunk, logoutThunk, registerThunk } from '../thunk'
import socket from '../../util/socketSingleton'

export interface IUserDataState {
    socketConnected: boolean,
    username: string,
    email: string,
    formAction: "login" | "register",
    JWT: string,
    generalChatUsers: string[]
}

const initialState: IUserDataState = {
    socketConnected: false,
    username: "",
    email: "",
    formAction: "login",
    JWT: "",
    generalChatUsers: []
}

export const userDataSlice = createSlice({
    name: 'userData',
    initialState,
    reducers: {
        setSocketConnected: (state: Draft<IUserDataState>, action: PayloadAction<boolean>) => {
            state.socketConnected = action.payload
        },
        setFormAction: ((state: Draft<IUserDataState>, action: PayloadAction<"register" | "login">) => {
            state.formAction = action.payload
        }),
        setJWT: ((state: Draft<IUserDataState>, action: PayloadAction<string>) => {
            state.JWT = action.payload
        }),
    },

    extraReducers(builder) {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.JWT = action.payload.jwt
            localStorage.setItem('chatAppAccessToken', action.payload.jwt)
            socket.connect(action.payload.jwt)
        })
        builder.addCase(loginThunk.rejected, (_, action) => {
            console.error(action.error.message)
        })
        builder.addCase(logoutThunk.rejected, (state) => {
            state.email = ""
            state.formAction = "login"
            state.JWT = ""
            state.username = ""
        })

        builder.addCase(registerThunk.rejected, (_, action) => {
            console.error(action.error.message)
        })
    },
})


export const dataActions = userDataSlice.actions
export default userDataSlice.reducer
