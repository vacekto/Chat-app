import { TUtilMiddleware } from '../types'
import { redisClient as redis } from '../Redis/connect'

export const user: TUtilMiddleware = (req, res, next) => {
    const id = req.cookies.cookieId;

    if (!id) {
        res.status(400).send('bad data')
        return
    }

    const sessionId = redis.get(req.body.username as string)
    if (id !== sessionId) {
        res.status(400).send('bad data')
        return
    }

    next()

}