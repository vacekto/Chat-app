import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '@chatapp/shared'
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