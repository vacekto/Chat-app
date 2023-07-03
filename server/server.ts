import express from 'express'
import { test } from '@chatapp/shared'

console.log(test)

const app = express()


app.get('*', (req, res) => {
    console.log('request')
    res.send('response')
})

app.listen(3000, () => {
    console.log('server started')
})