import type { AsyncFlashFunction } from './AsyncFlashFunction';

export type Context = {
    session?: any;
    flash: AsyncFlashFunction;
};
