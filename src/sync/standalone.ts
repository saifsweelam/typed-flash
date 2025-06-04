import type { FlashData } from '../global';
import flashFunction from './flash';
import type { Context } from '../global';
import type { FlashFunction } from './types/FlashFunction';
import type { Options } from './types/Options';

export default class StandaloneFlash implements Context {
    id?: string;
    session: FlashData;
    public flash: FlashFunction;

    constructor(options?: Options & { id?: string }) {
        this.session = options?.getData
            ? options.getData({ context: this })
            : {};

        this.flash = flashFunction(options);
        this.id = options?.id;
    }
}
