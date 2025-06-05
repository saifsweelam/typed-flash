import { describe, expect, it, vi } from 'vitest';
import asyncFlashFunction from '../../src/async/flash';

function mockContext() {
    return {};
}

function mockAsyncOptions() {
    return {
        getData: vi.fn().mockResolvedValue({}),
        saveData: vi.fn().mockResolvedValue(undefined),
    };
}

describe('asyncFlashFunction', () => {
    it('should save a message for a specific key', async () => {
        const context = mockContext();
        const options = mockAsyncOptions();
        const flash = asyncFlashFunction(options);
        await flash.call(context, 'info', 'First message');
        expect(options.saveData).toHaveBeenCalledWith(
            { info: ['First message'] },
            { context },
        );
    });

    it('should retrieve messages for a specific key', async () => {
        const context = mockContext();
        const options = mockAsyncOptions();
        options.getData.mockResolvedValue({ info: ['First message'] });
        const flash = asyncFlashFunction(options);
        const result = await flash.call(context, 'info');
        expect(result).toEqual(['First message']);
    });

    it('should delete messages for a specific key', async () => {
        const context = mockContext();
        const options = mockAsyncOptions();
        options.getData.mockResolvedValue({ info: ['First message'] });
        const flash = asyncFlashFunction(options);
        const result = await flash.call(context, 'info');
        expect(result).toEqual(['First message']);
        expect(options.saveData).toHaveBeenCalledWith({}, { context });
    });

    it('should return all data if called without parameters', async () => {
        const context = mockContext();
        const options = mockAsyncOptions();
        options.getData.mockResolvedValue({
            info: ['Message 1'],
            error: ['Error 1'],
        });
        const flash = asyncFlashFunction(options);
        const result = await flash.call(context);
        expect(result).toEqual({ info: ['Message 1'], error: ['Error 1'] });
    });

    it('should handle multiple messages for the same key', async () => {
        const context = mockContext();
        const options = mockAsyncOptions();
        options.getData.mockResolvedValue({});
        const flash = asyncFlashFunction(options);
        await flash.call(context, 'error', ['Error 1', 'Error 2']);
        const result = await flash.call(context, 'error');
        expect(result).toEqual(['Error 1', 'Error 2']);
    });

    it('should return an empty array if no messages exist for the given key', async () => {
        const context = mockContext();
        const options = mockAsyncOptions();
        options.getData.mockResolvedValue({});
        const flash = asyncFlashFunction(options);
        const result = await flash.call(context, 'nonexistent');
        expect(result).toEqual([]);
    });

    it('should call the custom getData function if provided', async () => {
        const customGetData = vi
            .fn()
            .mockResolvedValue({ customKey: ['Custom message'] });
        const context = mockContext();
        const options = mockAsyncOptions();
        const flash = asyncFlashFunction(options);
        const result = await flash.call(context, 'customKey', undefined, {
            getData: customGetData,
        });
        expect(customGetData).toHaveBeenCalledWith({ context });
        expect(result).toEqual(['Custom message']);
    });

    it('should call the custom saveData function if provided', async () => {
        const customSaveData = vi.fn().mockResolvedValue(undefined);
        const context = mockContext();
        const options = mockAsyncOptions();
        const flash = asyncFlashFunction(options);
        await flash.call(context, 'testKey', 'Test message', {
            saveData: customSaveData,
        });
        expect(customSaveData).toHaveBeenCalledWith(
            { testKey: ['Test message'] },
            { context },
        );
    });
});
