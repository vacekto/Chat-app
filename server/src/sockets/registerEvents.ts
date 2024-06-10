import { TIOServer, TServerSocket } from "src/types";
import registerMessageEvents from "./events/messageEvents";
import registerDisconnectionEvents from "./events/disconnectionEvents";

export const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    registerMessageEvents(io, socket)
    registerDisconnectionEvents(io, socket)
}

export default registerEvents