import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['src/sync/index.ts'],
    format: ['cjs', 'esm'],
    external: ['express'],
    dts: true,
    outDir: 'dist',
    clean: true,
});
