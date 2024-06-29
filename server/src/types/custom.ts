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

export interface ExtendedError extends Error {
    data?: any
}

export type TSocketIOMiddleware = (socket: TServerSocket, next: (err?: ExtendedError | undefined) => void) => void

// export type TDirectChannelDB<
//     populated extends boolean = false,
//     lean extends boolean = false
// > = Omit<IDirectChannel, "messages"> & {
//     messages: populated extends false ?
//     Schema.Types.ObjectId[] :
//     (
//         lean extends true ?
//         TMongoLean<IMessage>[] :
//         TMongoDoc<IMessage>[]
//     )
// }