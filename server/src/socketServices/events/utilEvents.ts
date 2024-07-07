import { TIOServer, TServerSocket } from "../../types";
import MongoAPI from "../../Mongo/API/index";
import { trimMongoObj, trimUserDB } from "../../util/functions";

export const utilEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("requestUsersList", async (userSearch, cb) => {
        const users = await MongoAPI.getUsersFuzzySearch(userSearch)
        cb(users.map(trimUserDB))
    })

    socket.on("requestDirectChanel", async (usernames, cb) => {
        let channel = await MongoAPI.getDirectChannelByUsersPopulatedLean(usernames)
        if (!channel) channel = await MongoAPI.createDirectChannel(usernames)
        cb(trimMongoObj(channel))
    })
}
