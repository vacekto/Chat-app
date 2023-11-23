import { createClient, RedisClientType } from 'redis';


export const client = createClient({
    url: 'redis://redis:6379'
});

const connectToRedis = async () => {
    client.on('error', err => console.log('Redis Client Error', err));

    try {
        if(!process.env.REDIS_CON_STRING)
            throw new Error('Redis connections string not specified')
        await client.connect();
        console.log('connected to redis')
    }
    catch (err) {
        console.log('could not connect to redis')
        process.exit(1)
    }
}


export default connectToRedis