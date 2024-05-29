import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { addAlertMiddleware } from './middleware'
import userDataReducer from './slice/userData'
import alertReducer from './slice/alert'
import messageReducer from "./slice/messages"
// import logger from "redux-logger"

const rootReducer = combineReducers({
    userData: userDataReducer,
    alert: alertReducer,
    messageReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(addAlertMiddleware)
    // .concat(logger)
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export default store