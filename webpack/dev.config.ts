import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

import { DEVELOPMENT } from '../src/constants/environment';

import baseConfig, { imageLoader, manifestPlugin, paths, regex } from './base.config';

export const appConfig: webpack.Configuration = {
  ...baseConfig,

  target: 'web',

  mode: 'development',

  devtool: 'source-map',

  entry: [
    baseConfig.entry[0],
    'webpack-dev-server/client?https://0.0.0.0:8080/',
    'webpack/hot/dev-server',
    baseConfig.entry[1],
  ],

  module: {
    rules: [
      imageLoader,

      // HTML
      {
        exclude: /node_modules/,
        include: paths.src,
        loader: 'html-loader',
        test: regex.html,
      },

      // @ts-ignore
      ...baseConfig.module.rules,
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEVELOPMENT),
      },
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    manifestPlugin,

    new webpack.NamedModulesPlugin(),

    new webpack.HotModuleReplacementPlugin(),
  ],
};

export const swConfig: webpack.Configuration = {
  ...baseConfig,

  target: 'webworker',

  mode: 'development',

  devtool: 'source-map',

  entry: { sw: ['babel-polyfill', path.resolve(paths.src, 'sw.ts')] },

  output: {
    ...baseConfig.output,
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(DEVELOPMENT),
      },
    }),
  ],
};

const configs = [appConfig, swConfig];

export default configs;
