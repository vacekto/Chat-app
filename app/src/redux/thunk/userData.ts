import { ILoginResponseData, IRegisterResponseData, IResponseError, isServerError, PartialBy, TLoginData, TRegisterData } from "@chatapp/shared"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { TRootState } from "../store"
import { refreshTokens, sendJSON } from "../../util/functions"
import { alertActions } from "../slice/alertSlice"
import { userDataActions } from "../slice/userDataSlice"
import { passwordless } from "../../util/passwordlessClient"

export const passwordAuth = createAsyncThunk<void, TLoginData, { state: TRootState }>(
    "userData/passwordAuth",
    async (args, thunkAPI) => {
        const res: Response = await sendJSON("/passwordLogin", args)
        const responseData: ILoginResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) {
            thunkAPI.dispatch(alertActions.addAlert({
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        thunkAPI.dispatch(userDataActions.login(responseData.accessToken))
    }
)

export const register = createAsyncThunk<void, PartialBy<TRegisterData, "repeatPassword">, { state: TRootState }>(
    "userData/register",
    async (args, thunkAPI) => {
        delete args.repeatPassword
        const res: Response = await sendJSON("/register", args)
        const responseData: IRegisterResponseData | IResponseError = await res.json()

        if (isServerError(responseData)) {
            thunkAPI.dispatch(alertActions.addAlert({
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        thunkAPI.dispatch(userDataActions.setFormAction("loginAction"))
        thunkAPI.dispatch(alertActions.addAlert({
            message: "Registered succesfully",
            severity: "success"
        }))
    }
)


export const passkeyAuth = createAsyncThunk<void, void, { state: TRootState }>(
    "userData/passkeyAuth",
    async (_, thunkAPI) => {
        const { token } = await passwordless.signinWithDiscoverable()
        if (!token) {
            alertActions.addAlert({
                message: "Could not authenticate, please try again",
                severity: "error"
            })
            throw new Error("passkey signin error")
        }
        const response = await sendJSON("/passkeyLogin", { token })
        const responseData: ILoginResponseData | IResponseError = await response.json()
        if (isServerError(responseData)) {
            thunkAPI.dispatch(alertActions.addAlert({
                message: responseData.errorMessage,
                severity: "error"
            }))
            throw new Error(responseData.errorMessage)
        }

        thunkAPI.dispatch(userDataActions.login(responseData.accessToken))
    }
)

export const GoogleAuth = createAsyncThunk<void, void, { state: TRootState }>(
    "userData/GoogleAuth",
    async (_, thunkAPI) => {
        const fetchedData = await refreshTokens()
        if (fetchedData.ok)
            thunkAPI.dispatch(userDataActions.login(fetchedData.res.accessToken))
    }
)