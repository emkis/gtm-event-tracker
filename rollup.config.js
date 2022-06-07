import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import esbuild from 'rollup-plugin-esbuild'
import size from 'rollup-plugin-size'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'commonjs',
      sourcemap: true,
    },
    {
      file: 'dist/es/index.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve(),
    esbuild({ target: 'es2018', minify: true }),
    size({ gzip: true }),
  ],
}

export default config
