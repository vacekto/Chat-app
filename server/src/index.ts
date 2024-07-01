import { createServer } from "http";
import express from 'express'
import cors from 'cors'
import connectToMongo from './Mongo/connect'
import connectToRedis from './Redis/connect'
import router from './httpServices/routes/router'
import cookieParser from 'cookie-parser'
import errorHandlers from './httpServices/middleware/errorHandler'
import { addSocketServer } from './socketServices/server'
import { CORS } from './util/config'

const app = express()
const httpServer = createServer(app);

app.use(cors({
    origin: CORS,
    credentials: true,
}))

addSocketServer(httpServer)

app.use('/', express.static(__dirname + '/SPA'))

app.use(express.json());
app.use(cookieParser());
app.use(router)
app.use(errorHandlers)

httpServer.listen(process.env.PORT, () => {
    console.log('server running in mode: ' + process.env.NODE_ENV)
    connectToMongo()
    connectToRedis()
})