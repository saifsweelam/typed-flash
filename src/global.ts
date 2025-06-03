export interface FlashMap {
    default: string;
}

export type FlashKey = keyof FlashMap;

export type FlashData = {
    [key in FlashKey]?: FlashMap[key][];
};
