import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
    addAlertMiddleware,
    setAlertTimeoutMiddleware,
    loginMiddleware,
    logoutMiddleware,
} from './middleware'
import userDataReducer from './slice/userDataSlice'
import alertReducer from './slice/alertSlice'
import messageReducer from "./slice/messagesSlice"
// import logger from "redux-logger"

const rootReducer = combineReducers({
    userData: userDataReducer,
    alert: alertReducer,
    message: messageReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(setAlertTimeoutMiddleware)
        .concat(addAlertMiddleware)
        .concat(loginMiddleware)
        .concat(logoutMiddleware)
    // .concat(logger)
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export default store