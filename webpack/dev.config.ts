import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

import baseConfig, { loaderImages, loaderPostCSS, loaderSass, manifestPlugin, paths, regex } from './base.config';

export const appConfig: webpack.Configuration = {
  ...baseConfig,

  entry: [
    baseConfig.entry[0],
    'webpack-dev-server/client?https://0.0.0.0:8080/',
    'webpack/hot/dev-server',
    baseConfig.entry[1],
  ],

  target: 'web',

  mode: 'development',

  devtool: 'source-map',

  module: {
    rules: [
      // Images
      {
        exclude: /node_modules/,
        include: paths.src,
        test: regex.img,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          loaderImages,
        ],
      },

      // Fonts
      {
        include: paths.root,
        loader: 'file-loader',
        options: {
          name: '[path][name]_[hash].[ext]',
        },
        test: regex.fonts,
      },

      // CSS
      {
        exclude: /node_modules/,
        include: paths.src,
        test: regex.css,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          loaderPostCSS,
          loaderSass,
        ],
      },

      // JSON
      {
        exclude: /node_modules/,
        include: paths.src,
        loader: 'file-loader',
        options: {
          sourceMap: true,
        },
        test: regex.json,
      },

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
        NODE_ENV: JSON.stringify('dev'),
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

  module: {
    rules: [
      // Images
      {
        exclude: /node_modules/,
        include: paths.src,
        test: regex.img,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
          loaderImages,
        ],
      },

      // @ts-ignore
      ...baseConfig.module.rules,
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev'),
      },
    }),
  ],
};

const configs = [appConfig, swConfig];

export default configs;
