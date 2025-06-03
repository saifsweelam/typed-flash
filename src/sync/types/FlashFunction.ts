import type { FlashData, FlashKey, FlashMap } from '../../global';
import type { Context } from '../../global';
import type { Options } from './Options';

export interface FlashFunction<C extends Context = Context> {
    <Key extends FlashKey>(
        this: C,
        key: Key,
        value: FlashMap[Key] | FlashMap[Key][],
        options?: Options<C>,
    ): void;

    <Key extends FlashKey>(this: C, key: Key): FlashData[Key];

    <Key extends FlashKey>(
        this: C,
        key: Key,
        value: undefined,
        options: Options,
    ): FlashData[Key];

    (this: C): FlashData;

    (this: C, key: undefined, value: undefined, options?: Options): FlashData;
}
