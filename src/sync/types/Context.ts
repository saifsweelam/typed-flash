import type { FlashFunction } from './FlashFunction';

export type Context = {
    session?: any;
    flash: FlashFunction;
};
