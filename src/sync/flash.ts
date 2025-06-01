import type { FlashKey } from '../global';
import type { Context } from './types/Context';
import type { FlashFunction } from './types/FlashFunction';
import type { Options } from './types/Options';

const flashFunction = (initialOptions: Options): FlashFunction => {
    return function <Key extends FlashKey>(
        this: Context,
        key?: Key,
        value?: TypedFlash.FlashMap[Key],
        overrideOptions?: Options,
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

        const data = options.getData();

        if (key && value) {
            if (!data[key]) {
                data[key] = [];
            }

            if (Array.isArray(value)) {
                data[key].push(...value);
            } else {
                data[key].push(value);
            }

            options.saveData(data);
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

        options.saveData({});
        return data;
    };
};

export default flashFunction;
