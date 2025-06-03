import type { RequestHandler } from 'express';
import asyncFlashFunction from './flash';
import type { AsyncOptions } from './types/AsyncOptions';

const middleware = (options: AsyncOptions): RequestHandler => {
    const safe = options.unsafe === undefined ? true : !options.unsafe;

    return function (req, res, next) {
        if (req.flash !== undefined && safe) {
            return next();
        }
        req.flash = asyncFlashFunction(options);
        next();
    };
};

export default middleware;
