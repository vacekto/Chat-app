import { createClient } from 'redis';


const client = createClient({
    url: process.env.REDIS_CON_STRING
});

client.on('error', err => console.log('Redis Client Error', err));

client.connect();



export default client