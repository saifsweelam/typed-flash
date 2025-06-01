import type { RequestHandler } from 'express';
import flashFunction from './flash';
import type { Options } from './types/Options';

const middleware = (options?: Options): RequestHandler => {
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
