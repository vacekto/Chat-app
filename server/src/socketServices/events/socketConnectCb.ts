import { trimUserDB } from "../../util/functions"
import MongoAPI from "../../Mongo/API"
import { TIOServer, TServerSocket } from "../../types"
import { usersList } from "../usersList"

export const socketConnectCb = async (io: TIOServer, socket: TServerSocket) => {
    const username = socket.data.username

    usersList.set(username, socket)
    console.log(`${username} connected`)

    const userDB = await MongoAPI.getUserLean({ username })

    if (!userDB) {
        socket.disconnect(true)
        return
    }

    userDB.directChannelsIds.forEach(c_id => {
        socket.join(c_id)
    })

    userDB.groupChannelsIds.forEach(c_id => {
        socket.join(c_id)
    })

    socket.emit("useData", trimUserDB(userDB))
}