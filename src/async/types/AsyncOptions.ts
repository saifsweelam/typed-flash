import type { Context, FlashData } from '../../global';

export type AsyncOptions<C extends Context = Context> = {
    unsafe?: boolean;
    saveData: (data: FlashData, args: { context: C }) => Promise<void>;
    getData: (args: { context: C }) => Promise<FlashData>;
};
