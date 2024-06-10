import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { ILoginResponseData } from '@chatapp/shared'
import { TFormAction } from '../../pages/AppForm'

export interface IUserDataState {
    socketConnected: boolean,
    username: string,
    email: string,
    formAction: TFormAction,
    JWT: string,
    generalChatUsers: string[],
    id: string
}

const initialState: IUserDataState = {
    socketConnected: false,
    username: "",
    email: "",
    formAction: "loginAction",
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
        setFormAction: ((state: Draft<IUserDataState>, action: PayloadAction<TFormAction>) => {
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
            state.formAction = "loginAction"
            state.JWT = ""
            state.username = ""
            state.id = ""
        })


    },
})

export const selectUsername = (state: IUserDataState) => state.username;

export const dataActions = userDataSlice.actions
export default userDataSlice.reducer
