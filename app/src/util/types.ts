import { ClientToServerEvents, ServerToClientEvents } from "@chatapp/shared"
import { Socket } from "socket.io-client"

export interface ILoginState {
    formAction: 'login' | 'register',
    username: string,
    password: string,
    repeatPassword: string,
    email: string
}

export type TClientSocket = Socket<ServerToClientEvents, ClientToServerEvents>

export interface IAlert {
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error',
    id: number

}