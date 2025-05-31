import type { FlashData } from './FlashData';

export type Options = {
    unsafe?: boolean;
    saveData?: (data: FlashData) => void;
    getData?: () => FlashData;
};
