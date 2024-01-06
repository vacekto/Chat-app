import express from 'express'
import cors from 'cors'
import connectToMongo from '@src/Mongo/connect'
import connectToRedis from '@src/Redis/connect'
import router from './routes/router'
import cookieParser from 'cookie-parser'
import path from 'path'
import errorHandler from './middleware/errorHandler'
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken'
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
    TokenPayloadZodSchema
} from '@chatapp/shared'

const app = express()
const httpServer = createServer(app);


const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer, { cors: { origin: "*" } });

io.use((socket, next) => {
    try {
        const token = socket.handshake.auth.token;
        jwt.verify(
            token,
            process.env.AUTH_TOKEN_SECRET as string,
        )
        const tokenPayload = token.split('.')[1]
        const decodedPayload = JSON.parse(atob(tokenPayload))
        const username = TokenPayloadZodSchema.parse(decodedPayload).username

        const usersOnline: string[] = []
        const activeSockets = io.of('/').sockets.entries()
        for (let [key, value] of activeSockets) {
            usersOnline.push(value.data.username)
        }

        if (usersOnline.includes(username))
            throw new Error('you are already connected')

        socket.data.username = username
        next()
    } catch (err: any) {
        next(err)
    }
});

io.on("connection", (socket) => {

    const usersOnline: string[] = []
    const activeSockets = io.of('/').sockets.entries()
    for (let [key, value] of activeSockets) {
        usersOnline.push(value.data.username)
    }

    console.log(usersOnline)

    console.log('user connected')
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
});

app.use(cors())

app.get('/', express.static(path.join(__dirname, 'SPA')))

app.use((req, res, next) => {
    console.log(req.method)
    next()
})

app.use(express.json());
app.use(cookieParser());

app.use(router)

app.use(errorHandler)

httpServer.listen(3000, () => {
    console.log('server running in mode: ' + process.env.NODE_ENV)
    connectToMongo()
    connectToRedis()
})