import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "@chatapp/shared"
import { Server } from "socket.io"
import { Server as HttpServer, IncomingMessage, ServerResponse } from "http"
import { auth } from "./middleware"
import { registerEvents } from "./registerEvents"
import { TServerSocket } from "src/types"

export const usersList = new Map<string, TServerSocket>()

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

    io.on("connection", registerEvents(io))
}