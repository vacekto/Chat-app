import { IMessage } from "@chatapp/shared";
import { TIOServer, TServerSocket } from "src/types";

export const messages = (io: TIOServer, socket: TServerSocket) => {

    socket.on("message", (msg: IMessage) => {
        socket.broadcast.emit("message", msg)
    })
}