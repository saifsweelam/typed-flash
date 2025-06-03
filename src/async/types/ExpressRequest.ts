import type { RequestContext } from '../../global';
import type { AsyncFlashFunction } from './AsyncFlashFunction';

declare global {
    namespace Express {
        export interface Request {
            flash: AsyncFlashFunction<RequestContext>;
        }
    }
}

export {};
