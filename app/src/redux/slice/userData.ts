import { createSlice } from '@reduxjs/toolkit'

export interface ISocketState {
    fetchedData: boolean
}

const initialState: ISocketState = {
    fetchedData: false
}

export const userDataSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {

    }
})

export const { } = userDataSlice.actions

export default userDataSlice.reducer