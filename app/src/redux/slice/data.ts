import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loginThunk, registerThunk } from '../thunk'

export interface IDataState {
    socketConnected: boolean,
    username: string,
    email: string,
    formAction: "login" | "register"
}

const initialState: IDataState = {
    socketConnected: false,
    username: "",
    email: "",
    formAction: "login"
}

export const userDataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSocketConnected: (state: Draft<IDataState>, action: PayloadAction<boolean>) => {
            state.socketConnected = action.payload
        },
        setFormAction: ((state: Draft<IDataState>, action: PayloadAction<"register" | "login">) => {
            state.formAction = action.payload

        })
    },
    extraReducers(builder) {
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.username = action.payload.username
            state.email = action.payload.email
            localStorage.setItem("chatAppAccessToken", action.payload.jwt)
        })
        builder.addCase(loginThunk.rejected, (_, action) => {
            console.error("error while fetching data from server: ", action.error.message)
        })
        builder.addCase(registerThunk.fulfilled, () => {
            console.log("register successful")
        })
        builder.addCase(registerThunk.rejected, (_, action) => {
            console.error("error while fetching data from server: ", action.error.message)
        })
    },
})


export const dataActions = userDataSlice.actions
export default userDataSlice.reducer
