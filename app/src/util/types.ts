import { ClientToServerEvents, ServerToClientEvents } from "@chatapp/shared"
import { Socket } from "socket.io-client"

export type TClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>
export interface IAlert {
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
    id: string,
    fading: boolean
}