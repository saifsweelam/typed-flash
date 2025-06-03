import flashFunction from './flash';
import type { Context } from './types/Context';
import type { AsyncFlashFunction } from './types/AsyncFlashFunction';
import type { AsyncOptions } from './types/AsyncOptions';

export default class StandaloneAsyncFlash implements Context {
    public flash: AsyncFlashFunction;
    constructor(options: AsyncOptions) {
        this.flash = flashFunction(options);
    }
}
