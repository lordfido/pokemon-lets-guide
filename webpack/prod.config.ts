import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

import { PRODUCTION } from '../src/constants/environment';

import baseConfig, { imageOptimizedLoader, manifestPlugin, uglifyPlugin } from './base.config';
import { appConfig as devAppConfig, swConfig as devSwConfig } from './dev.config';

const appConfig: webpack.Configuration = {
  ...devAppConfig,

  target: 'web',

  mode: 'production',

  devtool: false,

  entry: baseConfig.entry,

  module: {
    // @ts-ignore
    rules: [imageOptimizedLoader, ...devAppConfig.module.rules.splice(1)],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(PRODUCTION),
      },
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),

    manifestPlugin,
  ],

  optimization: {
    minimizer: [uglifyPlugin],
  },
};

const swConfig: webpack.Configuration = {
  ...devSwConfig,

  target: 'webworker',

  mode: 'production',

  devtool: false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(PRODUCTION),
      },
    }),
  ],

  optimization: {
    minimizer: [uglifyPlugin],
  },
};

const configs = [appConfig, swConfig];

export default configs;
