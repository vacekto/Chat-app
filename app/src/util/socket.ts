import { io, Socket } from "socket.io-client";
import { ServerToClientEvents, ClientToServerEvents } from '@chatapp/shared/'

const clientSocketSingleton = function () {
    let _instance: Socket<ServerToClientEvents, ClientToServerEvents> | undefined
    const url = import.meta.env.VITE_SERVER_URL

    const rateLimiter = {
        goodToGo: true
    }

    function connect(token: string, newConnection?: Boolean) {
        if (_instance?.connected && !newConnection) return _instance
        if (!rateLimiter.goodToGo) return _instance
        rateLimiter.goodToGo = false
        setTimeout(() => { rateLimiter.goodToGo = true }, 500)
        console.log('connecting socket instance')
        _instance = io(url, { auth: { token } })
        return _instance
    }

    return {
        get instance() {
            return _instance
        },
        connect
    }
}()

export default clientSocketSingleton