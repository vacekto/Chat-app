import { TMongoDoc, TMongoLean } from "../../types";
import DirectChannel, { TDirectChannelDB } from "../models/DirectChannel";

export function getDirectChannelByUsers<
    Populate extends boolean = false,
    UseLean extends boolean = false
>(
    users: [string, string],
    populate?: Populate,
    useLean?: UseLean
):
    Promise<UseLean extends true ?
        TMongoLean<TDirectChannelDB<Populate>> | null :
        TMongoDoc<TDirectChannelDB<Populate>> | null
    >

export async function getDirectChannelByUsers(users: [string, string], useLean?: boolean, populate?: boolean) {
    const query = DirectChannel.findOne({
        "users": { $all: users }
    })
    if (populate) query.populate("messages")
    if (useLean) query.lean()
    return query.exec()
}

