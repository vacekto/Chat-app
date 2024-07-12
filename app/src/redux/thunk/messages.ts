import { createAsyncThunk } from "@reduxjs/toolkit"
import { TRootState } from "../store"
import { messagesActions } from "../slice/messagesSlice"
import socket from "../../util/socket"
import { IMessage, logger } from "@chatapp/shared"

export const fetchDirectChannel = createAsyncThunk<void, [string, string], { state: TRootState }>(
    "messages/fetchDirectChannel",
    async (usernames, thunkAPI) => {
        const state = thunkAPI.getState()
        const channel = state.message.directChannels.find(c => {
            return (
                c.users.includes(usernames[0]) &&
                c.users.includes(usernames[1])
            )
        })

        if (channel) {
            thunkAPI.dispatch(messagesActions.selectDirectChannel(channel.id))
            return
        }

        socket.emit("requestDirectChanelByUsernames", usernames, (channel) => {
            thunkAPI.dispatch(messagesActions.addDirectChannel({
                channelId: channel.id,
                messages: channel.messages,
                users: channel.users,
                clientUsername: state.userData.username
            }))
            thunkAPI.dispatch(messagesActions.selectDirectChannel(channel.id))
        })
    }
)

export const addDirectMessage = createAsyncThunk<IMessage, IMessage, { state: TRootState }>(
    "messages/addDirectMessage",
    async (message, thunkAPI) => {
        const state = thunkAPI.getState()
        const index = state.message.directChannels.findIndex(c => c.id === message.channelId)
        if (index > -1) return message
        socket.emit("requestDirectChanelById", message.channelId, channel => {
            if (!channel) return
            thunkAPI.dispatch(messagesActions.addDirectChannel({
                channelId: channel.id,
                messages: channel.messages,
                users: channel.users,
                clientUsername: state.userData.username
            }))
        })
        return message
    }
)

export const addGroupMessage = createAsyncThunk<IMessage, IMessage, { state: TRootState }>(
    "messages/addGroupMessage",
    async (message, thunkAPI) => {
        const state = thunkAPI.getState()
        const index = state.message.groupChannels.findIndex(c => c.id === message.channelId)
        if (index > -1) return message
        socket.emit("requestGroupChanelById", message.channelId, channel => {
            if (!channel) {
                logger("channel should not be null")
                return
            }
            thunkAPI.dispatch(messagesActions.addGroupChannel(channel))
        })
        return message
    }
)