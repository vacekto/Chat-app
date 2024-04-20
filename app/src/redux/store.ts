import { configureStore } from '@reduxjs/toolkit'
import sokcetReducer from './slice/socket'
import userDataReducer from './slice/userData'

const store = configureStore({
    reducer: {
        socket: sokcetReducer,
        userData: userDataReducer
    }
})

export default store

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch