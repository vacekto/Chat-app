import { TGroupChannelDB, TMongoLean } from "../../types"
import GroupChannel from "../models/GroupChannel"
import { IMessage } from "@chatapp/shared"

export const getGroupChannelByIdPopulatedLean = async (channelId: string) => {
    const query = GroupChannel.findOne({
        "id": channelId
    }).populate<{ messages: TMongoLean<IMessage>[] }>("messages").lean()
    return (query.exec() as Promise<null | TMongoLean<TGroupChannelDB<TMongoLean<IMessage>[]>>>)
}