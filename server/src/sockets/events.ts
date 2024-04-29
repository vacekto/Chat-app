import {
    TIOServer,
    TIOSocket,
} from "../types";



const socketListener = (io: TIOServer) => (socket: TIOSocket) => {
    console.log("user connected")

    socket.on("disconnect", (reason) => {
        console.log("user disconnected, reason: ", reason)
    })


}


export default socketListener