import type { Context } from './Context';
import type { AsyncOptions } from './AsyncOptions';
import type { FlashData, FlashKey, FlashMap } from '../../global';

export interface AsyncFlashFunction {
    <Key extends FlashKey>(
        this: Context,
        key: Key,
        value: FlashMap[Key] | FlashMap[Key][],
        options?: AsyncOptions,
    ): Promise<void>;

    <Key extends FlashKey>(this: Context, key: Key): Promise<FlashData[Key]>;

    <Key extends FlashKey>(
        this: Context,
        key: Key,
        value: undefined,
        options: AsyncOptions,
    ): Promise<FlashData[Key]>;

    (this: Context): Promise<FlashData>;

    (
        this: Context,
        key: undefined,
        value: undefined,
        options?: AsyncOptions,
    ): Promise<FlashData>;
}
