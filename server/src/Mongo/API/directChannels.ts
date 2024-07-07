import { TDirectChannelDB, TMongoDoc, TMongoLean } from "../../types";
import DirectChannel from "../models/DirectChannel";
import { IDirectChannel, IMessage } from "@chatapp/shared";
import { Schema } from "mongoose";

export const getDirectChannelByUsers = async (users: [string, string]) => {
    const query = DirectChannel.findOne({
        "users": { $all: users }
    })
    return (query.exec() as Promise<null | TMongoDoc<TDirectChannelDB<Schema.Types.ObjectId[]>>>)
}

export const getDirectChannelByUsersLean = async (users: [string, string]) => {
    const query = DirectChannel.findOne({
        "users": { $all: users }
    }).lean()
    return (query.exec() as Promise<null | TMongoLean<TDirectChannelDB<Schema.Types.ObjectId[]>>>)
}

export const getDirectChannelByUsersPopulated = async (users: [string, string]) => {
    const query = DirectChannel.findOne({
        "users": { $all: users }
    }).populate("messages")
    return (query.exec() as Promise<null | TMongoDoc<TDirectChannelDB<TMongoDoc<IMessage>[]>>>)
}

export const getDirectChannelByUsersPopulatedLean = async (users: [string, string]) => {
    const query = DirectChannel.findOne({
        "users": { $all: users }
    }).populate("messages").lean()
    return (query.exec() as Promise<null | TMongoLean<TDirectChannelDB<TMongoLean<IMessage>[]>>>)
}

export async function createDirectChannel(users: [string, string]) {
    let channel = new DirectChannel({ users })
    await channel.save()
    return (channel as TMongoDoc<TDirectChannelDB<TMongoDoc<IMessage>[]>>)
}
