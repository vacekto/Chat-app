import { io, } from "socket.io-client";
import { TClientSocket } from './types'

const url = import.meta.env.VITE_SERVER_URL

let instance: TClientSocket = io(url, { autoConnect: false })

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