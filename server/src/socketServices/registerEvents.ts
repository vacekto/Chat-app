import { TIOServer, TServerSocket } from "../types";
import {
    utilEvents,
    disconnectionEvents,
    messageEvents,
    socketConnectCb
} from "./events";

const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    socketConnectCb(io, socket)
    messageEvents(io, socket)
    disconnectionEvents(io, socket)
    utilEvents(io, socket)
}

export default registerEvents