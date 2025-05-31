import middleware from './middleware';

declare global {
    namespace TypedFlash {
        export type FlashMap = {
            errors: {};
            messages: string;
            warnings: string;
        };
    }
}

export default middleware;
