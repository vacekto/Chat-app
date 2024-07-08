import { TIOServer, TServerSocket } from "../../types";
import MongoAPI from "../../Mongo/API/index";
import { trimMongoObj, trimUserDB } from "../../util/functions";
import { usersList } from "../usersList";

export const utilEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("requestUsersList", async (userSearch, cb) => {
        const users = await MongoAPI.getUsersFuzzySearch(userSearch)
        cb(users.map(trimUserDB))
    })

    socket.on("requestDirectChanelByUsernames", async (usernames, cb) => {
        let channel = await MongoAPI.getDirectChannelByUsersPopulatedLean(usernames)
        if (!channel) {
            channel = await MongoAPI.createDirectChannel(usernames)
            channel.users.forEach(username => {
                const userSocket = usersList.get(username)
                if (userSocket) userSocket.join(channel!.id)
            })
        }

        cb(trimMongoObj(channel))
    })

    socket.on("requestDirectChanelById", async (channelId, cb) => {
        let channel = await MongoAPI.getDirectChannelByIdPopulatedLean(channelId)
        cb((channel))
    })

    socket.on("requestGroupChanelById", async (channelId, cb) => {
        let channel = await MongoAPI.getGroupChannelByIdPopulatedLean(channelId)

        cb((channel))
    })
}
