import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import json from '@rollup/plugin-json'
import pkg from './package.json'
import env from './environment.json'
const { markdown } = require('svelte-preprocess-markdown')

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

const onwarn = (warning, onwarn) => (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) || onwarn(warning)

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.ACCESS_TOKEN': JSON.stringify(process.env.ACCESS_TOKEN || env.ACCESS_TOKEN),
        'process.env.APP_ID': JSON.stringify(process.env.APP_ID || env.APP_ID),
        'process.env.APP_SECRET': JSON.stringify(process.env.APP_SECRET || env.APP_SECRET),
        'process.env.REDIRECT_URI': JSON.stringify(process.env.REDIRECT_URI || env.REDIRECT_URI)
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        extensions: ['.svelte', '.md'],
        preprocess: markdown()
      }),
      resolve({
        browser: true,
        dedupe: ['svelte']
      }),
      commonjs(),

      legacy && babel({
        extensions: ['.js', '.mjs', '.html', '.svelte'],
        runtimeHelpers: true,
        exclude: ['node_modules/@babel/**'],
        presets: [
          ['@babel/preset-env', {
            targets: '> 0.25%, not dead'
          }]
        ],
        plugins: [
          '@babel/plugin-syntax-dynamic-import',
          ['@babel/plugin-transform-runtime', {
            useESModules: true
          }]
        ]
      }),

      !dev && terser({
        module: true
      })
    ],

    onwarn
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.ACCESS_TOKEN': JSON.stringify(process.env.ACCESS_TOKEN || env.ACCESS_TOKEN),
        'process.env.APP_ID': JSON.stringify(process.env.APP_ID || env.APP_ID),
        'process.env.APP_SECRET': JSON.stringify(process.env.APP_SECRET || env.APP_SECRET),
        'process.env.REDIRECT_URI': JSON.stringify(process.env.REDIRECT_URI || env.REDIRECT_URI)
      }),
      svelte({
        generate: 'ssr',
        dev,
        extensions: ['.svelte', '.md'],
        preprocess: markdown()
      }),
      resolve({
        dedupe: ['svelte']
      }),
      commonjs(),
      json()
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules || Object.keys(process.binding('natives'))
    ),

    onwarn
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode)
      }),
      commonjs(),
      !dev && terser()
    ],

    onwarn
  }
}
