import Path from 'path'
import RollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import RollupPluginTypescript2 from 'rollup-plugin-typescript2'
import PackageJson from './package.json'
import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import RollupPluginCommonjs from '@rollup/plugin-commonjs'

export default [
  {
    input: Path.resolve(__dirname, './src/index.ts'),
    external: Object.keys(PackageJson.dependencies || {}),
    plugins: [RollupPluginNodeResolve(), RollupPluginTypescript2(), getBabelOutputPlugin({ configFile: Path.resolve(__dirname, 'babel.config.js') })],
    output: {
      file: PackageJson.module
    }
  },
  {
    input: Path.resolve(__dirname, './src/index.ts'),
    plugins: [RollupPluginNodeResolve(), RollupPluginCommonjs(), RollupPluginTypescript2()],
    output: {
      file: PackageJson.browser,
      format: 'iife',
      name: 'WebAudioWave'
    }
  }
]
