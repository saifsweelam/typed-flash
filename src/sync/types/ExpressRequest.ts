import type { RequestContext } from '../../global';
import type { FlashFunction } from './FlashFunction';

declare global {
    namespace Express {
        export interface Request {
            flash: FlashFunction<RequestContext>;
        }
    }
}

export {};
