import { TIOServer, TServerSocket } from "src/types";

export const registerMessageEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("directMessage", (msg) => {

    })

    socket.on("groupMessage", (msg) => {

    })
}
