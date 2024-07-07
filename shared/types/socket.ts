import {
    IUser,
    IDirectChannel,
    IMessage,
    IUserData
} from "./custom";

export interface ServerToClientEvents {
    noArg: () => void;
    withAck: (d: string, callback: (e: number) => void) => void;
    message: (msg: IMessage) => void
    directMessage: (msg: IMessage) => void
    groupMessage: (msg: IMessage) => void
    useData: (data: IUserData) => void
    test: () => void
}

export interface ClientToServerEvents {
    hello: () => void
    message: (msg: IMessage) => void
    test: () => void
    directMessage: (msg: IMessage) => void
    groupMessage: (msg: IMessage) => void
    requestUsersList: (userSearch: string, cb: (users: IUser[]) => void) => void
    requestDirectChanel: ((usernames: [string, string], cb: (channel: IDirectChannel) => void) => void)
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    username: string;
}