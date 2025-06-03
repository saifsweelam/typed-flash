import type { AsyncOptions } from './AsyncOptions';
import type { Context, FlashData, FlashKey, FlashMap } from '../../global';

export interface AsyncFlashFunction<C extends Context = Context> {
    <Key extends FlashKey>(
        this: C,
        key: Key,
        value: FlashMap[Key] | FlashMap[Key][],
        options?: AsyncOptions,
    ): Promise<void>;

    <Key extends FlashKey>(this: C, key: Key): Promise<FlashData[Key]>;

    <Key extends FlashKey>(
        this: C,
        key: Key,
        value: undefined,
        options: AsyncOptions,
    ): Promise<FlashData[Key]>;

    (this: C): Promise<FlashData>;

    (
        this: C,
        key: undefined,
        value: undefined,
        options?: AsyncOptions,
    ): Promise<FlashData>;
}
