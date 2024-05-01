import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { dataActions } from '../redux/slice/data'
import { IAlert } from "../util/types"
import { alertActions } from './slice/alert'
import {
    ILoginResponseData,
    IResponseError,
    PartialBy,
    TLoginData,
    TRegisterData,
    isServerError,
} from "@chatapp/shared"

export const loginThunk = createAsyncThunk(
    "data/login",
    async (data: TLoginData, { dispatch }) => {
        const res: Response = await sendJSON("/login", data)
        const responseData: ILoginResponseData | IResponseError = await res.json()
        if (isServerError(responseData)) throw new Error(responseData.errorMessage)
        const alert: IAlert = {
            id: Date.now(),
            message: `Login succesfull`,
            severity: "success"
        }
        dispatch(alertActions.addAlert(alert))
        return responseData
    }
)

export const registerThunk = createAsyncThunk(
    "data/register",
    async (data: PartialBy<TRegisterData, "repeatPassword">, { dispatch }) => {
        delete data.repeatPassword
        const res = await sendJSON("/register", data)
        if (res.status !== 200) throw new Error()
        dispatch(dataActions.setFormAction("login"))
    }
)