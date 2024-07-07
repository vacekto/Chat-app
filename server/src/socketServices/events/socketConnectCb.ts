import MongoAPI from "../../Mongo/API"
import { TIOServer, TServerSocket } from "../../types"
import { usersList } from "../usersList"

export const socketConnectCb = async (io: TIOServer, socket: TServerSocket) => {
    const username = socket.data.username

    usersList.set(username, socket)
    console.log(`${username} connected`)

    const DBuser = await MongoAPI.getUserLean({ username })

    if (!DBuser) {
        socket.disconnect(true)
        return
    }

    socket.emit("useData", {
        email: DBuser.email,
        id: DBuser.id,
        username
    })
}