import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from '@chatapp/shared/'


const url = import.meta.env.VITE_SERVER_URL

let instance: Socket<ServerToClientEvents, ClientToServerEvents> = io(url, { autoConnect: false })

function connect(token: string, force?: boolean) {
    if (instance.connected && !force) return
    instance.auth = { token }
    instance.connect()
}

const socketSingleton = {
    instance,
    connect
}

export default socketSingleton