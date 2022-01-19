import Path from 'path'
import RollupPluginBabel from '@rollup/plugin-babel'
import RollupPluginNodeResolve from '@rollup/plugin-node-resolve'
import RollupPluginTypescript2 from 'rollup-plugin-typescript2'
import PackageJson from './package.json'

export default [
  {
    input: Path.resolve(__dirname, './src/index.ts'),
    external: Object.keys(PackageJson.dependencies || {}),
    plugins: [
      RollupPluginNodeResolve(),
      RollupPluginTypescript2(),
      RollupPluginBabel({
        babelHelpers: 'bundled'
      })
    ],
    output: [
      {
        file: PackageJson.module,
        format: 'esm',
        sourcemap: true
      },
      {
        file: PackageJson.browser,
        format: 'iife',
        name: 'WebAudioWave'
      }
    ]
  }
]
