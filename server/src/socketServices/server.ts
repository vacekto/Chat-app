import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "@chatapp/shared"
import { Server } from "socket.io"
import { Server as HttpServer, IncomingMessage, ServerResponse } from "http"
import { auth } from "./socketMiddleware"
import registerEvents from "./registerEvents"
import { CORS } from "../util/config"

export const addSocketServer = (server: HttpServer<typeof IncomingMessage, typeof ServerResponse>) => {

    const io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >(server, {
        cors: {
            origin: CORS
        }
    });

    io.use(auth)

    io.on("connection", function (socket) {
        registerEvents(io)(socket)
    })
}