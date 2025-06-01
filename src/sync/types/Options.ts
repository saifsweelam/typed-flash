import type { FlashData } from "../../global";

export type Options = {
    unsafe?: boolean;
    saveData?: (data: FlashData) => void;
    getData?: () => FlashData;
};
