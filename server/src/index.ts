import express from 'express'
import cors from 'cors'
import connectToMongo from '@src/Mongo/connect'
import connectToRedis from '@src/Redis/connect'
import router from './routes/router'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()

app.use('/', express.static(path.join(__dirname, 'SPA')))

app.use(cors())

app.use(express.json());

app.use(cookieParser());

app.use(router)

app.listen(3000, async () => {
    console.log('server running in mode: ' + process.env.NODE_ENV)
    // connectToMongo()
    connectToRedis()
})