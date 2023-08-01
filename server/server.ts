import express from 'express'
import cors from 'cors'
import connectToMongo from '@/Mongo/connect'
import connectToRedis from '@/Redis/connect'
import router from './src/routes/router'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())

app.use(express.json());

app.use(cookieParser());

app.use(router)

app.listen(3000, async () => {
    console.log('server started')
    connectToMongo()
    connectToRedis()
})