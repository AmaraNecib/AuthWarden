import {defineConfig} from 'tsup'

export default defineConfig({
    format: ['cjs', 'esm'],
    entryPoints: ['src/index.ts'],
    dts: true,
    shims: true,
    // minify: true,
    // sourcemap: true,
    // splitting: true,
    external: ['jsonwebtoken'],
    clean: true,
    })