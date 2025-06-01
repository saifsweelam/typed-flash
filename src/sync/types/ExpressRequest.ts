import type { FlashFunction } from './FlashFunction';

declare global {
    namespace Express {
        export interface Request {
            flash: FlashFunction;
        }
    }
}

export {};
