import { TIOServer, TServerSocket } from "../../types";
import MongoAPI from "../../Mongo/API/index";
import { trimMongoObj } from "../../util/functions";
import { IMessage } from "@chatapp/shared";

export const utilEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("requestUsersList", async (userSearch, cb) => {
        const users = await MongoAPI.getUsersFuzzySearch(userSearch, true)
        users.forEach(trimMongoObj)
        cb(users)
    })

    socket.on("requestDirectChanel", async (usernames, cb) => {
        let channel = await MongoAPI.getDirectChannelByUsers(usernames, true, true)
        if (!channel) channel = await MongoAPI.createDirectChannel(usernames)
        trimMongoObj(channel)
        cb({
            id: channel.id,
            messages: (channel.messages as IMessage[]),
            users: channel.users
        })
    })


}
