import type { Context, FlashKey, FlashMap } from '../global';
import type { AsyncFlashFunction } from './types/AsyncFlashFunction';
import type { AsyncOptions } from './types/AsyncOptions';

const asyncFlashFunction = <C extends Context = Context>(
    initialOptions: AsyncOptions<C>,
): AsyncFlashFunction<C> => {
    return async function <Key extends FlashKey>(
        this: C,
        key?: Key,
        value?: FlashMap[Key],
        overrideOptions?: AsyncOptions,
    ) {
        const options = { ...initialOptions, ...overrideOptions };

        const data = await options.getData({ context: this });

        if (key && value) {
            if (!data[key]) {
                data[key] = [];
            }

            if (Array.isArray(value)) {
                data[key].push(...value);
            } else {
                data[key].push(value);
            }

            return await options.saveData(data, { context: this });
        }

        if (key && !value) {
            if (data[key]) {
                const messages = data[key];
                delete data[key];
                options.saveData(data, { context: this });
                return messages;
            }
            return [];
        }

        await options.saveData({}, { context: this });
        return data;
    };
};

export default asyncFlashFunction;
