import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

import { PRE_PRODUCTION } from '../src/constants/environment';

import baseConfig, { imageOptimizedLoader, manifestPlugin } from './base.config';
import { appConfig as devAppConfig, swConfig as devSwConfig } from './dev.config';

const appConfig: webpack.Configuration = {
  ...devAppConfig,

  target: 'web',

  mode: 'development',

  devtool: 'source-map',

  entry: baseConfig.entry,

  module: {
    // @ts-ignore
    rules: [imageOptimizedLoader, ...devAppConfig.module.rules.splice(1)],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(PRE_PRODUCTION),
      },
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    manifestPlugin,
  ],
};

const swConfig: webpack.Configuration = {
  ...devSwConfig,

  target: 'webworker',

  mode: 'development',

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(PRE_PRODUCTION),
      },
    }),
  ],
};

const configs = [appConfig, swConfig];

export default configs;
