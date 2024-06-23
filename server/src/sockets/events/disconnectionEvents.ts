import { TIOServer, TServerSocket } from "src/types"

export const registerDisconnectionEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("disconnecting", (msg, jwt) => {
        console.log(`${socket.data.username} disconnected`)
    })

}

