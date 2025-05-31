import type { Context } from './Context';
import type { FlashData, FlashKey } from './FlashData';
import type { Options } from './Options';

export interface FlashFunction {
    <Key extends FlashKey>(
        this: Context,
        key: Key,
        value: TypedFlash.FlashMap[Key] | TypedFlash.FlashMap[Key][],
        options?: Options,
    ): void;

    <Key extends FlashKey>(this: Context, key: Key): FlashData[Key];

    <Key extends FlashKey>(
        this: Context,
        key: Key,
        value: undefined,
        options: Options,
    ): FlashData[Key];

    (this: Context): FlashData;

    (
        this: Context,
        key: undefined,
        value: undefined,
        options?: Options,
    ): FlashData;
}
