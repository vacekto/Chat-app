import { createClient, RedisClientType } from 'redis';


export const client = createClient({
    url: process.env.REDIS_CON_STRING
});

const connect = async () => {
    client.on('error', err => console.log('Redis Client Error', err));

    try {
        await client.connect();
        console.log('connected to redis')
    }
    catch (err) {
        console.log('could not connect to redis')
    }
}


export default connect