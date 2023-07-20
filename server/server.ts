import express from 'express'
import cors from 'cors'
import connectToMongo from './Mongo/connect'
import router from './routes/router'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors())

app.use(express.json());

app.use(cookieParser());

app.use(router)

app.post('/login', (req, res) => {
    console.log('login', req.body)
    res.send('response')
})

app.get('*', (req, res) => {
    console.log('request')
    res.send('response')
})

app.listen(3000, async () => {
    console.log('server started')
    connectToMongo()
})