import { TIOServer, TServerSocket } from "../../types";

export const messageEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("directMessage", (msg) => {

    })

    socket.on("groupMessage", (msg) => {

    })
}
