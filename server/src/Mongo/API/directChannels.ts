import DirectChannel from "../models/DirectChannel";

export const getDirectChannelByUsers = async (users: [string, string], useLean?: boolean, populate?: boolean) => {
    const query = DirectChannel.findOne({
        "users": { $all: users }
    })
    if (populate) query.populate("messages")
    if (useLean) query.lean()
    return query.exec()
}

export async function createDirectChannel(users: [string, string]) {
    let channel = new DirectChannel({ users })
    await channel.save()
    return channel
}
