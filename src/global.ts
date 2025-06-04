import type { Request } from 'express';

export interface FlashMap {
    default: string;
}

export type FlashKey = keyof FlashMap;

export type FlashData = {
    [key in FlashKey]?: FlashMap[key][];
};

export type Context = {
    session?: any;
};

export type RequestContext = Request & Context;
