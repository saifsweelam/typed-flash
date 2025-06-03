export type { FlashMap, FlashData, FlashKey, Context } from '../global';
export type { AsyncFlashFunction } from './types/AsyncFlashFunction';
export type { AsyncOptions } from './types/AsyncOptions';
import './types/ExpressRequest';
import middleware from './middleware';
import StandaloneAsyncFlash from './standalone';

export { StandaloneAsyncFlash, middleware as asyncFlashMiddleware };

export default middleware;
