import { IMessage, IRoom } from '@chatapp/shared'
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'

const publicRoom: IRoom = {
    users: [],
    id: "1",
    messages: [],
    roomName: "public"
}

export interface IMessagesState {
    rooms: IRoom[]
    activeRoom?: IRoom
    users: string[]
}

const initialState: IMessagesState = {
    rooms: [publicRoom],
    activeRoom: publicRoom,
    users: []
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: (state: Draft<IMessagesState>, action: PayloadAction<IMessage>) => {
            const room = state.rooms.find(r => r.id === action.payload.id)
            room?.messages.push(action.payload)
            state.activeRoom!.messages.push(action.payload)
        },
        usersUpdate: (state: Draft<IMessagesState>, action: PayloadAction<string[]>) => {
            state.users = action.payload
        },
        selectRoom: (state: Draft<IMessagesState>, action: PayloadAction<string>) => {
            const roomIndex = state.rooms.findIndex(room => room.id === action.payload)
            state.activeRoom = state.rooms[roomIndex]
        },
    },
})

export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer