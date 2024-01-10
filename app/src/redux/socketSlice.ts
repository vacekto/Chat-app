import { createSlice } from '@reduxjs/toolkit'
import createSocketSingleton from '../util/socketSingleton'

export interface ISocketState {
    singleton: ReturnType<typeof createSocketSingleton>,
}

const initialState: ISocketState = {
    singleton: createSocketSingleton()
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<T>) => {
        //   state.value += action.payload
        // }
    }
})

export const { } = socketSlice.actions

export default socketSlice.reducer