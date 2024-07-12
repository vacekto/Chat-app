import { IMessage, IGroupChannel } from '@chatapp/shared'
import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IClientDirectChannel } from '@chatapp/shared';
import thunk from '../thunk';

interface IAddDirectChannelPayload {
    users: string[]
    messages: IMessage[]
    clientUsername: string
    channelId: string
}

export interface IMessagesState {
    users: string[]
    directChannels: IClientDirectChannel[]
    groupChannels: IGroupChannel[]
    activeChannel: (IGroupChannel & {
        kind: "group"
    }) | (IClientDirectChannel & {
        kind: "direct"
    })
}

type TChannelId = string

const publicRoom: IGroupChannel = {
    users: [],
    id: "1",
    messages: [],
    channelName: "public",
}

const initialState: IMessagesState = {
    activeChannel: {
        ...publicRoom,
        kind: "group"
    },
    users: [],
    directChannels: [],
    groupChannels: [publicRoom]
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addGroupMessage: (state: Draft<IMessagesState>, action: PayloadAction<IMessage>) => {
            const groupChannel = state.groupChannels.find(c => c.id === action.payload.channelId)
            groupChannel?.messages.push(action.payload)
        },

        addGroupChannel: (state: Draft<IMessagesState>, action: PayloadAction<IGroupChannel>) => {
            state.groupChannels.push(action.payload)
        },

        addDirectChannel: (state: Draft<IMessagesState>, action: PayloadAction<IAddDirectChannelPayload>) => {
            const {
                users,
                messages,
                clientUsername,
                channelId
            } = action.payload

            const index = state.directChannels.findIndex(c => c.id === channelId)
            if (index > -1) return

            const channelName = users[0] === clientUsername ?
                users[1] : users[0]

            const newDirectChannel: IClientDirectChannel = {
                messages,
                users,
                channelName,
                id: channelId
            }
            state.directChannels.push(newDirectChannel)
        },

        selectDirectChannel: (state: Draft<IMessagesState>, action: PayloadAction<TChannelId>) => {
            const index = state.directChannels.findIndex(c => c.id === action.payload)
            if (index > -1) state.activeChannel = {
                ...state.directChannels[index],
                kind: 'direct'
            }
        },

        selectGroupChannel: (state: Draft<IMessagesState>, action: PayloadAction<TChannelId>) => {
            const index = state.groupChannels.findIndex(c => c.id === action.payload)
            if (index > -1) state.activeChannel = {
                ...state.groupChannels[index],
                kind: "group"
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(thunk.addDirectMessage.fulfilled, (state, action) => {
            const channel = state.directChannels.find(c => c.id === action.payload.channelId)
            channel?.messages.push(action.payload)
            if (channel?.id === state.activeChannel.id)
                state.activeChannel.messages.push(action.payload)
        })
        builder.addCase(thunk.addGroupMessage.fulfilled, (state, action) => {
            const channel = state.groupChannels.find(c => c.id === action.payload.channelId)
            channel?.messages.push(action.payload)
            if (channel?.id === state.activeChannel.id)
                state.activeChannel.messages.push(action.payload)
        })


    },
})


export const messagesActions = messagesSlice.actions
export default messagesSlice.reducer