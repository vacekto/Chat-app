import { io } from "socket.io-client";
import { TClientSocket } from './types'

interface ISocketProxy extends TClientSocket {
    connect: (jwt?: string, force?: boolean) => this
}

let instance: TClientSocket = io(
    import.meta.env.VITE_SERVER_URL,
    { autoConnect: false }
)

/**
 * 
 * @param token JWT access token
 * @param force connect anew even when already connected
 * @returns 
 */

const createSocketProxy = (socket: TClientSocket) => {

    const onProxy = new Proxy(socket.on, {
        apply(target, thisArg, args) {
            if (socket.hasListeners(args[0])) return socket
            return Reflect.apply(target, thisArg, args)
        }
    })

    const connectProxy = new Proxy(socket.connect, {
        apply(target, thisArg, args) {
            const token = args[0]
            const force = args[1]
            if (instance.connected && !force) return socket
            if (token) socket.auth = { token }
            return Reflect.apply(target, thisArg, [])
        }
    })

    const socketProxy = new Proxy(socket, {
        get(target, prop, receiver) {
            if (prop === 'on') return onProxy
            if (prop === 'connect') return connectProxy
            return Reflect.get(target, prop, receiver)
        }
    })

    return socketProxy as ISocketProxy
}

export default createSocketProxy(instance)