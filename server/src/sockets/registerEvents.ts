import { TIOServer, TServerSocket } from "../types";
import {
    utilEvents,
    disconnectionEvents,
    messageEvents,
    connectCb
} from "./events";

const registerEvents = (io: TIOServer) => (socket: TServerSocket) => {
    connectCb(io, socket)
    messageEvents(io, socket)
    disconnectionEvents(io, socket)
    utilEvents(io, socket)
}

export default registerEvents