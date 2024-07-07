import { TDirectChannelDB, TMongoDoc, TMongoLean } from "../../types";
import DirectChannel from "../models/DirectChannel";
import { IMessage } from "@chatapp/shared";
import { Schema } from "mongoose";

export const getDirectChannelByUsers = async (usernames: [string, string]) => {
    const query = DirectChannel.findOne({
        "users": { $all: usernames }
    })
    return (query.exec() as Promise<null | TMongoDoc<TDirectChannelDB<Schema.Types.ObjectId[]>>>)
}

export const getDirectChannelByIdPopulatedLean = async (channelId: string) => {
    const query = DirectChannel.findOne({
        "id": channelId
    }).populate<{ messages: TMongoLean<IMessage>[] }>("messages").lean()
    return (query.exec() as Promise<null | TMongoLean<TDirectChannelDB<TMongoLean<IMessage>[]>>>)
}

export const getDirectChannelByUsersLean = async (usernames: [string, string]) => {
    const query = DirectChannel.findOne({
        "users": { $all: usernames }
    }).lean()
    return (query.exec() as Promise<null | TMongoLean<TDirectChannelDB<Schema.Types.ObjectId[]>>>)
}

type hihi = TDirectChannelDB<TMongoLean<IMessage>[]>

export const getDirectChannelByUsersPopulated = async (usernames: [string, string]): Promise<null | TMongoLean<TDirectChannelDB<TMongoLean<IMessage>[]>>> => {
    const query = DirectChannel.findOne({
        "users": { $all: usernames }
    }).populate<{ messages: TMongoDoc<IMessage>[] }>("messages").lean()
    return query.exec()
}

export const getDirectChannelByUsersPopulatedLean = async (usernames: [string, string]): Promise<null | TMongoLean<TDirectChannelDB<TMongoLean<IMessage>[]>>> => {
    const query = DirectChannel.findOne({
        "users": { $all: usernames }
    }).populate<{ messages: TMongoLean<IMessage>[] }>("messages").lean()
    return (query.exec())
}

export async function createDirectChannel(users: [string, string]) {
    let channel = new DirectChannel({ users })
    await channel.save()
    return (channel as TMongoDoc<TDirectChannelDB<TMongoDoc<IMessage>[]>>)
}

