import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUserData } from '@chatapp/shared'
import { TFormAction } from '../../pages/AppForm/AppForm'


type TAccessToken = string
export interface IUserDataState extends IUserData {
    socketConnected: boolean,
    formAction: TFormAction,
    accessToken: string,
}

const initialState: IUserDataState = {
    socketConnected: false,
    username: "",
    email: "",
    formAction: "loginAction",
    accessToken: "",
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
            state.accessToken = action.payload
        }),

        logout: ((state) => {
            state = initialState
        }),
    },
})


export const userDataActions = userDataSlice.actions
export default userDataSlice.reducer