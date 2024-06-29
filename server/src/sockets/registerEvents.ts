import { TIOServer, TServerSocket } from "../types";
import {
    registerUtilEvents,
    registerDisconnectionEvents,
    registerMessageEvents
} from "./events";

const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    registerMessageEvents(io, socket)
    registerDisconnectionEvents(io, socket)
    registerUtilEvents(io, socket)
}

export default registerEvents