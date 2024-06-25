import { TIOServer, TMongoLean, TServerSocket } from "src/types";
import MongoAPI from "../../Mongo/API/index";
import { IUser, PartialBy } from "@chatapp/shared";

export const registerUtilEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("requestUsersList", async (userSearch, cb) => {
        const users = await MongoAPI.users.getUsersFuzzySearch(userSearch, true)
        users.forEach((user: PartialBy<TMongoLean<IUser>, "_id">) => {
            delete user._id
        })
        cb(users)
    })

    socket.on("requestDirectChanel", (usernaes) => {

    })
}
