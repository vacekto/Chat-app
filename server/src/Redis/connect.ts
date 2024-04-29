import { createClient } from 'redis';

const getClient = () => {
    const client = createClient({
        url: process.env.REDIS_URI
    })
    return client
}

export const redisClient = getClient()

const connectToRedis = async () => {
    redisClient.on('error', err => console.log('Redis Client Error', err));

    try {
        if (!process.env.REDIS_URI)
            throw new Error('Redis connections string not specified')
        await redisClient.connect();
        console.log('connected to redis')
    }
    catch (err) {
        console.log('could not connect to redis, err: ', err)
    }
}


export default connectToRedis