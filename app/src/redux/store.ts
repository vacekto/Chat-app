import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './slice/data'
import alertReducer from './slice/alert'

const store = configureStore({
    reducer: {
        userData: userDataReducer,
        alert: alertReducer
    },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export default store