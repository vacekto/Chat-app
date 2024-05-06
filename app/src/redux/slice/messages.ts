import { IMessage, IRoom } from '@chatapp/shared'
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'

const publicRoom: IRoom = {
    participants: [],
    id: "1",
    messages: [],
    roomName: "public"
}

export interface IMessagesState {
    rooms: IRoom[]
    activeRoom?: IRoom
}

const initialState: IMessagesState = {
    rooms: [publicRoom],
    activeRoom: publicRoom
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state: Draft<IMessagesState>, action: PayloadAction<IMessage>) => {
            const room = state.rooms.find(r => r.id === action.payload.id)
            room?.messages.push(action.payload)
            state.activeRoom!.messages.push(action.payload)
        }
    },
})

export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer