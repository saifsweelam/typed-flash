import type { FlashData } from '../../global';
import type { FlashFunction } from './FlashFunction';

export type Context = {
    session?: { flash?: FlashData };
    flash: FlashFunction;
};
