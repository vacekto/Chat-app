import GroupChannel from "./models/GroupChannel";

export async function initDB() {
    const query = { "channelName": "public" }
    const exists = await GroupChannel.exists(query)

    if (exists) return

    const publicRoom = new GroupChannel({
        channelName: "public",
        id: "-1",
        messages: [],
        users: []
    })
    publicRoom.save()
}
