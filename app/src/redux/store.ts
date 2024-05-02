import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userDataReducer from './slice/data'
import alertReducer from './slice/alert'
import { addAlertMiddleware } from './middleware'

const rootReducer = combineReducers({
    userData: userDataReducer,
    alert: alertReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(addAlertMiddleware)
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export default store