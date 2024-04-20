import { createSlice } from '@reduxjs/toolkit'

export interface ISocketState {
    fetchedData: boolean
    JWT: string
}

const initialState: ISocketState = {
    fetchedData: false,
    JWT: ""
}

export const userDataSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {

    }
})

export const { } = userDataSlice.actions

export default userDataSlice.reducer