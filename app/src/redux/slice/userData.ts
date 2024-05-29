import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ILoginResponseData } from '@chatapp/shared'

export interface IUserDataState {
    socketConnected: boolean,
    username: string,
    email: string,
    formAction: "login" | "register",
    JWT: string,
    generalChatUsers: string[],
    id: string
}

const initialState: IUserDataState = {
    socketConnected: false,
    username: "",
    email: "",
    formAction: "login",
    JWT: "",
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
        setFormAction: ((state: Draft<IUserDataState>, action: PayloadAction<"register" | "login">) => {
            state.formAction = action.payload
        }),
        setJWT: ((state: Draft<IUserDataState>, action: PayloadAction<string>) => {
            state.JWT = action.payload
        }),
        connect: ((state: Draft<IUserDataState>, action: PayloadAction<ILoginResponseData>) => {
            state.username = action.payload.username
            state.email = action.payload.email
            state.JWT = action.payload.jwt
            state.id = action.payload.id
        }),
        disconnect: ((state: Draft<IUserDataState>) => {
            state.email = ""
            state.formAction = "login"
            state.JWT = ""
            state.username = ""
            state.id = ""
        })


    },
})

export const dataActions = userDataSlice.actions
export default userDataSlice.reducer
