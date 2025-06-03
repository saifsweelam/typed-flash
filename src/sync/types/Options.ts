import type { FlashData } from '../../global';
import type { Context } from '../../global';

export type Options<C extends Context = Context> = {
    unsafe?: boolean;
    saveData?: (data: FlashData, args: { context: C }) => void;
    getData?: (args: { context: C }) => FlashData;
};
