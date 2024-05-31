"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewareErrorDecorator = void 0;
// Express version 4 doesn't catch async errors in middleware by itself, this decoretor ensures that it does.
const middlewareErrorDecorator = (middleware) => (async (req, res, next) => {
    try {
        await middleware(req, res, next);
    }
    catch (err) {
        next(err);
    }
});
exports.middlewareErrorDecorator = middlewareErrorDecorator;
