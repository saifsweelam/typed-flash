import type { FlashKey } from '../global';
import type { AsyncFlashFunction } from './types/AsyncFlashFunction';
import type { AsyncOptions } from './types/AsyncOptions';
import type { Context } from './types/Context';

const asyncFlashFunction = (
    initialOptions: AsyncOptions,
): AsyncFlashFunction => {
    return async function <Key extends FlashKey>(
        this: Context,
        key?: Key,
        value?: TypedFlash.FlashMap[Key],
        overrideOptions?: AsyncOptions,
    ) {
        const options = { ...initialOptions, ...overrideOptions };

        const data = await options.getData();

        if (key && value) {
            if (!data[key]) {
                data[key] = [];
            }

            if (Array.isArray(value)) {
                data[key].push(...value);
            } else {
                data[key].push(value);
            }

            await options.saveData(data);
        }

        if (key && !value) {
            if (data[key]) {
                const messages = data[key];
                delete data[key];
                options.saveData(data);
                return messages;
            }
            return [];
        }

        await options.saveData({});
        return data;
    };
};

export default asyncFlashFunction;
