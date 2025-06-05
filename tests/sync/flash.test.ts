import { describe, it, expect, vi } from 'vitest';
import flashFunction from '../../src/sync/flash';
import { FlashData } from '../../src/global';

function mockContextWithSession(sessionData = {}) {
    return {
        session: {
            flash: sessionData,
        },
    };
}

function mockContextWithoutSession() {
    return {};
}

describe('Flash Function', () => {
    it('should throw an error when no session is available', () => {
        const context = mockContextWithoutSession();
        const flash = flashFunction();
        expect(() => flash.call(context, 'info', 'Test message')).toThrow(
            'Session is not available',
        );
    });
    it('should return an empty object when no key and value are provided', () => {
        const context = mockContextWithSession();
        const flash = flashFunction();
        const result = flash.call(context);
        expect(result).toEqual({});
    });

    it('should add a message to the flash data when a key and value are provided', () => {
        const context = mockContextWithSession();
        const flash = flashFunction();
        flash.call(context, 'info', 'This is a test message');
        const result = flash.call(context, 'info');
        expect(result).toEqual(['This is a test message']);
    });

    it('should return messages for a given key and remove them from flash data', () => {
        const context = mockContextWithSession();
        const flash = flashFunction();
        flash.call(context, 'info', 'First message');
        flash.call(context, 'info', 'Second message');
        const result = flash.call(context, 'info');
        expect(result).toEqual(['First message', 'Second message']);
        const afterResult = flash.call(context, 'info');
        expect(afterResult).toEqual([]);
    });

    it('should return all data if called without parameters', () => {
        const context = mockContextWithSession({
            info: ['Message 1'],
            error: ['Error 1'],
        });
        const flash = flashFunction();
        const result = flash.call(context);
        expect(result).toEqual({ info: ['Message 1'], error: ['Error 1'] });
    });

    it('should handle multiple messages for the same key', () => {
        const context = mockContextWithSession();
        const flash = flashFunction();
        flash.call(context, 'error', ['Error 1', 'Error 2']);
        const result = flash.call(context, 'error');
        expect(result).toEqual(['Error 1', 'Error 2']);
    });

    it('should return an empty array if no messages exist for the given key', () => {
        const context = mockContextWithSession();
        const flash = flashFunction();
        const result = flash.call(context, 'nonexistent');
        expect(result).toEqual([]);
    });

    it('should call the custom getData function if provided', () => {
        const customGetData = vi.fn(
            () => ({ customKey: ['Custom message'] }) as FlashData,
        );
        const context = mockContextWithSession();
        const flash = flashFunction({
            getData: customGetData,
        });
        const result = flash.call(context, 'customKey');
        expect(customGetData).toHaveBeenCalledWith({ context });
        expect(result).toEqual(['Custom message']);
    });

    it('should call the custom saveData function if provided', () => {
        const customSaveData = vi.fn();
        const context = mockContextWithSession();
        const flash = flashFunction({
            saveData: customSaveData,
        });
        flash.call(context, 'testKey', 'Test message');
        expect(customSaveData).toHaveBeenCalledWith(
            { testKey: ['Test message'] },
            { context },
        );
    });
});
