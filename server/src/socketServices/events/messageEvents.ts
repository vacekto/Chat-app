import { TIOServer, TServerSocket } from "../../types";

export const messageEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("directMessage", (msg) => {
        socket.to(msg.channelId).emit("directMessage", msg)
        console.log(msg)
    })

    socket.on("groupMessage", (msg) => {

    })
}
