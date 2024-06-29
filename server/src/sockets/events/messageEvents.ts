import { TIOServer, TServerSocket } from "../../types";

export const registerMessageEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("directMessage", (msg) => {

    })

    socket.on("groupMessage", (msg) => {

    })
}
