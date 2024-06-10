import { TIOServer, TServerSocket } from "src/types"

const registerDisconnectionEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("disconnecting", (msg, jwt) => {
        console.log(`${socket.data.username} disconnected`)
    })

}

export default registerDisconnectionEvents