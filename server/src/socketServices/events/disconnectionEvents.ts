import { TIOServer, TServerSocket } from "../../types"

export const disconnectionEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("disconnecting", (msg, jwt) => {
        console.log(`${socket.data.username} disconnected`)
    })

}

