import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from '@chatapp/shared/'

const createSocketSingleton = function () {
    let instance: Socket<ServerToClientEvents, ClientToServerEvents>
    const url = import.meta.env.VITE_SERVER_URL

    instance = io(url, { autoConnect: false })

    function connect(token: string, force?: boolean) {
        if (instance.connected && !force) return
        instance.auth = { token }
        instance.connect()
    }

    return {
        instance,
        connect
    }
}

export default createSocketSingleton()