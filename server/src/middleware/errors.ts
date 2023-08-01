import { TUtilMiddleware, TErrorMiddleware } from '../util/types'
import { logger } from '../util/logger'

export const invalidPathHandler: TUtilMiddleware = (req, res, next) => {
    res.status(404)
    res.send('invalid path')
}

export const errorHandler: TErrorMiddleware = (err, req, res, next) => {
    logger.log(err)

    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal server error')
        return
    }

    next(err)
}