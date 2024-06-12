import { TIOServer, TServerSocket } from "src/types";

const registerMessageEvents = (io: TIOServer, socket: TServerSocket) => {
    socket.on("directMessage", (msg, jwt) => {

    })

    socket.on("groupMessage", (msg, jwt) => {

    })
}

export default registerMessageEvents