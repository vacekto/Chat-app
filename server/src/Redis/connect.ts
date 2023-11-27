import { createClient } from 'redis';


const getClient = () => {

    const client = createClient({
        url: process.env.REDIS_CON_STRING
    })

    return client
}

export const client = getClient()

const connectToRedis = async () => {
    client.on('error', err => console.log('Redis Client Error', err));

    try {
        if (!process.env.REDIS_CON_STRING)
            throw new Error('Redis connections string not specified')
        await client.connect();
        console.log('connected to redis')
    }
    catch (err) {
        console.log('could not connect to redis')
    }
}


export default connectToRedis