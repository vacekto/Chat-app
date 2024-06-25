import { IUser } from "./custom";
import { IMessage } from "./zodInferred";

export interface ServerToClientEvents {
    noArg: () => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    message: (msg: IMessage) => void
    directMessage: (msg: IMessage, jwt: string) => void
    groupMessage: (msg: IMessage, jwt: string) => void
    test: () => void
}

export interface ClientToServerEvents {
    hello: () => void
    message: (msg: IMessage) => void
    test: () => void
    directMessage: (msg: IMessage, author: string, recipient: string) => void
    groupMessage: (msg: IMessage, channelId: string) => void
    requestUsersList: (userSearch: string, cb: (users: IUser[]) => void) => void
    requestDirectChanel: ((usernames: [string, string], cb: () => void) => void)
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    username: string;
}