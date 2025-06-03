import type { FlashData } from '../global';
import flashFunction from './flash';
import type { Context } from './types/Context';
import type { FlashFunction } from './types/FlashFunction';
import type { Options } from './types/Options';

export default class StandaloneFlash implements Context {
    session: FlashData;
    public flash: FlashFunction;

    constructor(options?: Options) {
        this.session = options?.getData ? options.getData() : {};

        this.flash = flashFunction(options);
    }
}
