import type { FlashData, FlashKey, FlashMap } from '../../global';
import type { Context } from './Context';
import type { Options } from './Options';

export interface FlashFunction {
    <Key extends FlashKey>(
        this: Context,
        key: Key,
        value: FlashMap[Key] | FlashMap[Key][],
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
