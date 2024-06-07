import { TIOServer, TServerSocket } from "src/types";
import { usersList } from "./server"

export const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    usersList.set(socket.data.username, socket)
    io.emit("usersUpdate", Array.from(usersList.keys()))

    socket.on("message", msg => {
        socket.broadcast.emit("message", msg)
    })

    socket.on("disconnecting", reason => {
        usersList.delete(socket.data.username)
        io.emit("usersUpdate", Array.from(usersList.keys()))
    })

}


