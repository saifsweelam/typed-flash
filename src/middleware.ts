import type { RequestHandler } from 'express';
import flashFunction from './flash';
import type { FlashFunction } from './types/FlashFunction';

type MiddlewareOptions = {
    unsafe?: boolean;
    sessionKey?: string;
};

declare global {
    namespace Express {
        interface Request {
            flash: FlashFunction;
        }
    }
}

const middleware = (options?: MiddlewareOptions): RequestHandler => {
    options = options || {};
    const safe = options.unsafe === undefined ? true : !options.unsafe;

    return function (req, res, next) {
        if (req.flash !== undefined && safe) {
            return next();
        }
        req.flash = flashFunction(options);
        next();
    };
};

export default middleware;
