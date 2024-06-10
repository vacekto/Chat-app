import { IMessage } from "./zodInferred";

export interface ServerToClientEvents {
    noArg: () => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    message: (msg: IMessage) => void
    directMessage: (msg: IMessage, jwt: string) => void
    groupMessage: (msg: IMessage, jwt: string) => void
    usersUpdate: (users: string[]) => void
    test: () => void
}

export interface ClientToServerEvents {
    hello: () => void
    message: (msg: IMessage) => void
    test: () => void
    directMessage: (msg: IMessage, author: string, recipient: string) => void
    groupMessage: (msg: IMessage, channelId: string) => void

}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    username: string;
}