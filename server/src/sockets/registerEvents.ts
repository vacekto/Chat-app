import { TIOServer, TServerSocket } from "src/types";
import registerMessageEvents from "./events/messageEvents";
import registerDisconnectionEvents from "./events/disconnectionEvents";
import registerUtilEvents from "./events/utilEvents";

export const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    registerMessageEvents(io, socket)
    registerDisconnectionEvents(io, socket)
    registerUtilEvents(io, socket)

}

export default registerEvents