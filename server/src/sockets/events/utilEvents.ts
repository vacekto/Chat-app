import { TIOServer, TServerSocket } from "src/types";
import MongoAPI from "../../Mongo/API/index";

export const registerUtilEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("requestUsersList", async (userSearch, cb) => {
        const users = await MongoAPI.getUsersFuzzySearch(userSearch, true)
        // const usernames = users.map(user => user.username)
        cb(users)
    })
}
