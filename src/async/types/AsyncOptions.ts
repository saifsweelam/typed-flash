import type { FlashData } from "../../global";

export type AsyncOptions = {
    unsafe?: boolean;
    saveData: (data: FlashData) => Promise<void>;
    getData: () => Promise<FlashData>;
};
