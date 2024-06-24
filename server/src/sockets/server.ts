import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from "@chatapp/shared"
import { Server } from "socket.io"
import { Server as HttpServer, IncomingMessage, ServerResponse } from "http"
import { auth } from "./middleware"
import registerEvents from "./registerEvents"
import { CORS } from "../util/config"
import { usersList } from "./usersList"

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
        usersList.set(socket.data.username, socket)
        console.log(`${socket.data.username} connected`)
        registerEvents(io)(socket)
    })
}