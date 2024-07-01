import { TUtilMiddleware } from '../../types'

// Express version 4 doesn't catch async errors in middleware by itself, this decoretor ensures that it does.
export const middlewareErrorDecorator = (middleware: TUtilMiddleware) => (async (req, res, next) => {
    try {
        await middleware(req, res, next)
    } catch (err) {
        next(err)
    }
}) as TUtilMiddleware