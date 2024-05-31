"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const redis_1 = require("redis");
const getClient = () => {
    const client = (0, redis_1.createClient)({
        url: process.env.REDIS_URI
    });
    return client;
};
exports.redisClient = getClient();
const connectToRedis = async () => {
    exports.redisClient.on('error', err => console.log('Redis Client Error', err));
    try {
        if (!process.env.REDIS_URI)
            throw new Error('Redis connections string not specified');
        await exports.redisClient.connect();
        console.log('connected to redis');
    }
    catch (err) {
        console.log('could not connect to redis, err: ', err);
    }
};
exports.default = connectToRedis;
