import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

import baseConfig, { manifestPlugin, uglifyPlugin } from './base.config';
import { appConfig as devAppConfig, swConfig as devSwConfig } from './dev.config';

const appConfig: webpack.Configuration = {
  ...devAppConfig,

  target: 'web',

  mode: 'production',

  devtool: false,

  entry: baseConfig.entry,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
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
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  optimization: {
    minimizer: [uglifyPlugin],
  },
};

const configs = [appConfig, swConfig];

export default configs;
