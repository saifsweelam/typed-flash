import type { AsyncFlashFunction } from "./AsyncFlashFunction";

declare global {
    namespace Express {
        export interface Request {
            flash: AsyncFlashFunction;
        }
    }
}

export {};
