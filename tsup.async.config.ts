import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['src/async/index.ts'],
    format: ['cjs', 'esm'],
    external: ['express'],
    dts: true,
    outDir: 'dist/async',
    tsconfig: 'tsconfig.async.json',
    clean: true,
});
