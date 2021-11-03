import Path from 'path'
import RollupPluginBabel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import RollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import RollupPluginCommonjs from '@rollup/plugin-commonjs'
import RollupPluginTypescript2 from 'rollup-plugin-typescript2'
import PackageJson from './package.json'

export default [
  {
    input: Path.resolve(__dirname, './src/index.ts'),
    external: Object.keys(PackageJson.dependencies || {}),
    plugins: [
      RollupPluginTypescript2(),
      RollupPluginNodeResolve(),
      RollupPluginCommonjs(),
      getBabelOutputPlugin({ configFile: Path.resolve(__dirname, './babel.config.js') })
    ],
    output: [
      {
        file: PackageJson.module,
        format: 'esm',
        sourcemap: true
      }
    ]
  },
  {
    input: Path.resolve(__dirname, './src/index.ts'),
    external: ['d3'],
    plugins: [
      RollupPluginCommonjs(),
      RollupPluginTypescript2(),
      RollupPluginNodeResolve(),
      RollupPluginBabel({
        babelHelpers: 'bundled'
      })
    ],
    output: [
      {
        file: Path.resolve(__dirname, './dist/index.browser.js'),
        format: 'iife',
        name: 'WebAudioWave',
        globals: {
          d3: 'd3'
        }
      }
    ]
  }
]
