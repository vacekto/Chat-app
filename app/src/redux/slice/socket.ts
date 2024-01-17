import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Draft } from '@reduxjs/toolkit'
export interface ISocketState {
    connected: boolean
}

const initialState: ISocketState = {
    connected: false
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        // incrementByAmount: (state, action: PayloadAction<T>) => {
        //   state.value += action.payload
        // }
        setConnected: (state: Draft<ISocketState>, action: PayloadAction<boolean>) => {
            state.connected = action.payload
        }
    }
})

export const { setConnected } = socketSlice.actions

export default socketSlice.reducer