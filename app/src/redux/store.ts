import { configureStore } from '@reduxjs/toolkit'
import userDataReducer from './slice/data'

const store = configureStore({
    reducer: {
        userData: userDataReducer,
    },
})

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch

export default store