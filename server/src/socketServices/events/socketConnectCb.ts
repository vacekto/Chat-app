import MongoAPI from "../../Mongo/API"
import { TIOServer, TServerSocket } from "../../types"
import { usersList } from "../usersList"

export const socketConnectCb = async (io: TIOServer, socket: TServerSocket) => {
    const username = socket.data.username

    usersList.set(username, socket)
    console.log(`${username} connected`)

    const user = await MongoAPI.getUser({ username }, true)

    if (!user) {
        socket.disconnect(true)
        return
    }

    socket.emit("useData", {
        email: user.email,
        id: user.id,
        username
    })
}