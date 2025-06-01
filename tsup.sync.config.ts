import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['src/sync/index.ts'],
    format: ['cjs', 'esm'],
    external: ['express'],
    dts: true,
    outDir: 'dist',
    tsconfig: 'tsconfig.sync.json',
    clean: true,
});
