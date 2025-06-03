import flashFunction from './flash';
import type { AsyncFlashFunction } from './types/AsyncFlashFunction';
import type { AsyncOptions } from './types/AsyncOptions';

export default class StandaloneAsyncFlash {
    public flash: AsyncFlashFunction;
    constructor(options: AsyncOptions) {
        this.flash = flashFunction(options);
    }
}
