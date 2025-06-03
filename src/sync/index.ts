export type { FlashMap, FlashData, FlashKey } from '../global';
export type { Context } from '../global';
export type { FlashFunction } from './types/FlashFunction';
export type { Options } from './types/Options';
import './types/ExpressRequest';
import middleware from './middleware';
import StandaloneFlash from './standalone';

export { StandaloneFlash, middleware as flashMiddleware };

export default middleware;
