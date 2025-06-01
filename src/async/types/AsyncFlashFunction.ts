import type { Context } from './Context';
import type { AsyncOptions } from './AsyncOptions';
import type { FlashData, FlashKey } from '../../global';

export interface AsyncFlashFunction {
    <Key extends FlashKey>(
        this: Context,
        key: Key,
        value: TypedFlash.FlashMap[Key] | TypedFlash.FlashMap[Key][],
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
