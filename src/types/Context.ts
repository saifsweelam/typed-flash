import type { FlashData } from './FlashData';
import type { FlashFunction } from './FlashFunction';

export type Context = {
    session?: { flash?: FlashData };
    flash: FlashFunction;
};
