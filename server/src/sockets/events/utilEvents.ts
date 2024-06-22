import { TIOServer, TServerSocket } from "src/types";
import { getUsersFuzzy } from "src/Mongo/API";


const registerUtilEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("requestUsersList", async (userSearch, cb) => {
        const users = await getUsersFuzzy(userSearch)
        const usernames = users.map(user => user.username)
        cb(usernames)
    })
}

export default registerUtilEvents