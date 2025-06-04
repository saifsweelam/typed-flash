import type { Context } from '../global';
import flashFunction from './flash';
import type { AsyncFlashFunction } from './types/AsyncFlashFunction';
import type { AsyncOptions } from './types/AsyncOptions';

export default class StandaloneAsyncFlash implements Context {
    id?: string;
    public flash: AsyncFlashFunction;
    constructor(options: AsyncOptions & { id?: string }) {
        this.flash = flashFunction(options);
        this.id = options.id;
    }
}
