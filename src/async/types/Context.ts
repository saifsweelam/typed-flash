import type { FlashData } from '../../global';
import type { AsyncFlashFunction } from './AsyncFlashFunction';

export type Context = {
    session?: { flash?: FlashData };
    flash: AsyncFlashFunction;
};
