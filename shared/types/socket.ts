import {
    IUser,
    IDirectChannel,
    IMessage,
    IUserData,
    IGroupChannel
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
    /**
     * fetches direct channel from server, creates one in DB it doesnt already exist
     */
    requestDirectChanelByUsernames: ((usernames: [string, string], cb: (channel: IDirectChannel) => void) => void)
    requestDirectChanelById: ((channelId: string, cb: (channel: IDirectChannel | null) => void) => void)
    requestGroupChanelById: ((channelId: string, cb: (channel: IGroupChannel | null) => void) => void)
}

export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    username: string;
}