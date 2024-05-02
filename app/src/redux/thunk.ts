import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { dataActions } from '../redux/slice/data'
import { IAlert } from "../util/types"
import { alertActions } from './slice/alert'
import {
    ILoginResponseData,
    IRegisterResponseData,
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
        const alert: IAlert = isServerError(responseData) ? {
            id: Date.now(),
            message: responseData.errorMessage,
            severity: "error"
        } : {
            id: Date.now(),
            message: "Login succesfull",
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
        const res: Response = await sendJSON("/register", data)
        const responseData: IRegisterResponseData | IResponseError = await res.json()

        const alert: IAlert = isServerError(responseData) ? {
            id: Date.now(),
            message: responseData.errorMessage,
            severity: "error"

        } : {
            id: Date.now(),
            message: `Account created`,
            severity: "success"
        }

        dispatch(alertActions.addAlert(alert))
        if (!isServerError(responseData))
            dispatch(dataActions.setFormAction("login"))
    }
)