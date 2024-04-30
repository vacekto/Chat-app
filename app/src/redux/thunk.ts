import { IUserStoreData, PartialBy, TLoginData, TRegisterData } from "@chatapp/shared"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { dataActions } from '../redux/slice/data'
import { IAlert } from "../util/types"
import { alertActions } from './slice/alert'

export const loginThunk = createAsyncThunk(
    "data/login",
    async (data: TLoginData) => {
        const res = await sendJSON("login", data)
        const responseData: IUserStoreData & { jwt: string } = await res.json()
        console.log("testing login thunk", responseData)
        return responseData
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