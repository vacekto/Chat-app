import { IUserStoreData, PartialBy, TLoginData, TRegisterData } from "@chatapp/shared"
import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit"
import { sendJSON } from "../util/functions"
import { IStoreState, dataActions } from '../redux/slice/data'
import { TAppDispatch } from "./store"

type TAsyncThunkConfig = {
    dispatch: TAppDispatch,
    /** return type for `thunkApi.getState` */
    state: IStoreState
    /** type for `thunkApi.dispatch` */
    /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
    extra?: unknown
    /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
    rejectValue?: unknown
    /** return type of the `serializeError` option callback */
    serializedErrorType?: unknown
    /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
    pendingMeta?: unknown
    /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
    fulfilledMeta?: unknown
    /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
    rejectedMeta?: unknown
}

type TLoginThunk = AsyncThunk<
    IUserStoreData & { jwt: string; },
    TLoginData,
    TAsyncThunkConfig
>

export const loginThunk: TLoginThunk = createAsyncThunk(
    "data/login",
    async (data: TLoginData) => {
        const res = await sendJSON("login", data)
        const responseData: IUserStoreData & { jwt: string } = await res.json()
        console.log("testing login thunk", responseData)
        return responseData
    }
)

type TRegisterThunk = AsyncThunk<
    void,
    PartialBy<TRegisterData, "repeatPassword">,
    TAsyncThunkConfig
>

export const registerThunk: TRegisterThunk = createAsyncThunk(
    "data/register",
    async (data: PartialBy<TRegisterData, "repeatPassword">, thunkAPI) => {
        delete data.repeatPassword
        const res = await sendJSON("/register", data)
        if (res.status !== 200) throw new Error()
        thunkAPI.dispatch(dataActions.setFormAction("login"))
    }
)
