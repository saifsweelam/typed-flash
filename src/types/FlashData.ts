export type FlashKey = keyof TypedFlash.FlashMap;

export type FlashData = {
    [key in FlashKey]?: TypedFlash.FlashMap[key][];
};
