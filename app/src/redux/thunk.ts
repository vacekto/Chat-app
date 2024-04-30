import {
    ILoginResponseData,
    IResponseError,
    PartialBy,
    TLoginData,
    TRegisterData,
    isServerError,
} from "@chatapp/shared"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { dataActions } from '../redux/slice/data'
import { IAlert } from "../util/types"
import { alertActions } from './slice/alert'

export const loginThunk = createAsyncThunk(
    "data/login",
    async (data: TLoginData, thunkAPI) => {
        const res: Response = await sendJSON("/login", data)
        const responseData: ILoginResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) throw new Error(responseData.errorMessage)

        const alert: IAlert = {
            id: Date.now(),
            message: `Login succesfull`,
            severity: "success"
        }

        thunkAPI.dispatch(addAlertThunk(alert))

        return responseData

        // let res: Response
        // let responseData: ILoginResponseData | IResponseError

        // try {
        //     res = await sendJSON("/login", data)
        // } catch (err) {
        //     throw new Error("There was some sort of network error, please try again later")
        // }
        // try {
        //     responseData = await res.json()
        // } catch (err) {
        //     throw new Error("Server returns invalid JSON data, please be patient")
        // }
        // if (isServerError(responseData)) throw new Error(responseData.errorMessage)
        // if (res.status !== 200) throw new Error("Unsuccessful login, please try again")

        // const alert: IAlert = {
        //     id: Date.now(),
        //     message: `${responseData.username}`,
        //     severity: "success"
        // }

        // thunkAPI.dispatch(addAlertThunk(alert))
        // return responseData
        // 


    }
)

export const registerThunk = createAsyncThunk(
    "data/register",
    async (data: PartialBy<TRegisterData, "repeatPassword">, thunkAPI) => {

        delete data.repeatPassword

        const res = await sendJSON("/register", data)

        if (res.status !== 200) throw new Error()

        thunkAPI.dispatch(dataActions.setFormAction("login"))
    }
)

export const addAlertThunk = createAsyncThunk(
    "alert/add",
    (alert: IAlert, thunkAPI) => {
        thunkAPI.dispatch(alertActions.addAlert(alert))
        const removeAlert = () => thunkAPI.dispatch(alertActions.removeAlert(alert.id))
        setTimeout(removeAlert, 5000)
    }
)