import type { FlashKey, FlashMap } from '../global';
import type { Context } from '../global';
import type { FlashFunction } from './types/FlashFunction';
import type { Options } from './types/Options';

const flashFunction = <C extends Context = Context>(
    initialOptions: Options<C> = {},
): FlashFunction<C> => {
    return function <Key extends FlashKey>(
        this: C,
        key?: Key,
        value?: FlashMap[Key],
        overrideOptions?: Options<C>,
    ) {
        const options = { ...initialOptions, ...overrideOptions };

        options.getData =
            options.getData ||
            (() => {
                if (!this.session) {
                    throw new Error('Session is not available');
                }

                if (this.session.flash) {
                    return this.session.flash;
                }

                this.session.flash = {};
                return this.session.flash;
            });

        options.saveData =
            options.saveData ||
            ((data) => {
                if (!this.session) {
                    throw new Error('Session is not available');
                }

                this.session.flash = data;
            });

        const data = options.getData({ context: this });

        if (key && value) {
            if (!data[key]) {
                data[key] = [];
            }

            if (Array.isArray(value)) {
                data[key].push(...value);
            } else {
                data[key].push(value);
            }

            return options.saveData(data, { context: this });
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

        options.saveData({}, { context: this });
        return data;
    };
};

export default flashFunction;
