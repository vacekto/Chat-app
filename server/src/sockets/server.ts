import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "@chatapp/shared"
import { Server } from "socket.io"
import { Server as HttpServer, IncomingMessage, ServerResponse } from "http"
import { auth } from "./middleware"
import socketListener from './events'

export const addSocketServer = (server: HttpServer<typeof IncomingMessage, typeof ServerResponse>) => {

    const io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >(server, {
        cors: {
            origin: '*'
        }
    });


    io.use(auth)

    io.on("connection", socketListener(io))
}