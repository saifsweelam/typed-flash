import type { FlashData } from '../global';
import flashFunction from './flash';
import type { Context } from '../global';
import type { FlashFunction } from './types/FlashFunction';
import type { Options } from './types/Options';

export default class StandaloneFlash implements Context {
    session: FlashData;
    public flash: FlashFunction;

    constructor(options?: Options) {
        this.session = options?.getData
            ? options.getData({ context: this })
            : {};

        this.flash = flashFunction(options);
    }
}
