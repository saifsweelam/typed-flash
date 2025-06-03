export type { FlashMap, FlashData, FlashKey } from '../global';
export type { Context } from './types/Context';
export type { AsyncFlashFunction } from './types/AsyncFlashFunction';
export type { AsyncOptions } from './types/AsyncOptions';
import './types/ExpressRequest';
import middleware from './middleware';
import StandaloneAsyncFlash from './standalone';

export { StandaloneAsyncFlash, middleware as flashMiddleware };

export default middleware;
