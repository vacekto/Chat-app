import { ClientToServerEvents, IUser, InterServerEvents, ServerToClientEvents, SocketData } from '@chatapp/shared'
import { AuthenticatorTransportFuture, Base64URLString, CredentialDeviceType } from '@simplewebauthn/types'
import { Request, Response, NextFunction } from 'express'
import { Document, Types } from 'mongoose'
import { FlattenMaps, Error as MongooseError } from 'mongoose'
import { Server, Socket } from 'socket.io'

export type TUtilMiddleware = (req: Request, res: Response, next: NextFunction) => void
export type TErrorMiddleware = (err: Error | MongooseError, req: Request, res: Response, next: NextFunction) => void

export type TMongoLean<T> = FlattenMaps<T> & { _id: Types.ObjectId }
export type TMongoDoc<T> = Document<unknown, {}, T> & T & { _id: Types.ObjectId; }

export type TServerSocket = Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>

export type TIOServer = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>
// internal socket.io interface, could not be imported for some reason
export interface ExtendedError extends Error {
    data?: any
}

export type TSocketIOMiddleware = (socket: TServerSocket, next: (err?: ExtendedError | undefined) => void) => void

export type TPasskey = {
    // SQL: Store as `TEXT`. Index this column
    id: Base64URLString;
    // SQL: Store raw bytes as `BYTEA`/`BLOB`/etc...
    //      Caution: Node ORM's may map this to a Buffer on retrieval,
    //      convert to Uint8Array as necessary
    publicKey: Uint8Array;
    // SQL: Foreign Key to an instance of your internal user model
    user: IUser;
    // SQL: Store as `TEXT`. Index this column. A UNIQUE constraint on
    //      (webAuthnUserID + user) also achieves maximum user privacy
    webauthnUserID: Base64URLString;
    // SQL: Consider `BIGINT` since some authenticators return atomic timestamps as counters
    counter: number;
    // SQL: `VARCHAR(32)` or similar, longest possible value is currently 12 characters
    // Ex: 'singleDevice' | 'multiDevice'
    deviceType: CredentialDeviceType;
    // SQL: `BOOL` or whatever similar type is supported
    backedUp: boolean;
    // SQL: `VARCHAR(255)` and store string array as a CSV string
    // Ex: ['ble' | 'cable' | 'hybrid' | 'internal' | 'nfc' | 'smart-card' | 'usb']
    transports?: AuthenticatorTransportFuture[];
};