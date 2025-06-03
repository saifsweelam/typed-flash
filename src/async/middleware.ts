import type { RequestHandler } from 'express';
import asyncFlashFunction from './flash';
import type { AsyncOptions } from './types/AsyncOptions';
import type { RequestContext } from '../global';

const middleware = (options: AsyncOptions<RequestContext>): RequestHandler => {
    const safe = options.unsafe === undefined ? true : !options.unsafe;

    return function (req, res, next) {
        if (req.flash !== undefined && safe) {
            return next();
        }
        req.flash = asyncFlashFunction<RequestContext>(options);
        next();
    };
};

export default middleware;
