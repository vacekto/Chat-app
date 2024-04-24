import express from 'express'
import cors from 'cors'
import connectToMongo from './Mongo/connect'
import connectToRedis from './Redis/connect'
import router from './routes/router'
import cookieParser from 'cookie-parser'
import errorMiddleware from './middleware/errorHandler'
import { createServer } from "http";
import { addSocketServer } from './sockets/server'

const app = express()
const httpServer = createServer(app);

app.use(cors({
    origin: process.env.NODE_ENV === "development" ?
        `http://localhost:${process.env.PORT_CLIENT}` :
        `${process.env.VITE_SERVER_URL}`
}))

addSocketServer(httpServer)

app.use('/', express.static(__dirname + '/SPA'))

app.use(express.json());
app.use(cookieParser());
app.use(router)
app.use(errorMiddleware)

httpServer.listen(3000, () => {
    console.log('server running in mode: ' + process.env.NODE_ENV)
    connectToMongo()
    connectToRedis()
})