import { TIOServer, TServerSocket } from "src/types";
import { usersList } from "./server"

export const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    console.log(`${socket.data.username} connected`)

    usersList.set(socket.data.username, socket)

    socket.on("message", msg => {
        socket.broadcast.emit("message", msg)
    })

    socket.on("disconnect", reason => {
        console.log(`user ${socket.data.username} disconnecting, reason: `, reason)
        usersList.delete(socket.data.username)
    })
}


