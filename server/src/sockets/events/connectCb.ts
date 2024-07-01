import { TIOServer, TServerSocket } from "../../types"
import { usersList } from "../usersList"

export const connectCb = (io: TIOServer, socket: TServerSocket) => {
    usersList.set(socket.data.username, socket)
    console.log(`${socket.data.username} connected`)
}