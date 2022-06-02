import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import size from 'rollup-plugin-size'

/** @type {import('rollup').RollupOptions} */
const config = {
  input: 'src/index.ts',
  plugins: [typescript(), commonjs(), nodeResolve(), size({ gzip: true })],
  output: [
    {
      file: 'dist/index.cjs.js',
      format: 'commonjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.min.js',
      format: 'umd',
      name: 'GTMEventTracker',
      sourcemap: true,
      plugins: [terser()],
    },
  ],
}

export default config
