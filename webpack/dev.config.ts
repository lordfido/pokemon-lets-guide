import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import baseConfig, { paths, regex, loaderPostCSS, loaderSass, loaderImages, manifestPlugin } from './base.config';

export const appConfig: webpack.Configuration = {
  ...baseConfig,

  target: 'web',

  mode: 'development',

  devtool: 'source-map',

  module: {
    rules: [
      // Images
      {
        test: regex.img,
        include: paths.src,
        exclude: /node_modules/,
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
        test: regex.fonts,
        include: paths.root,
        loader: 'file-loader',
        options: {
          name: '[path][name]_[hash].[ext]',
        },
      },

      // CSS
      {
        test: regex.css,
        include: paths.src,
        exclude: /node_modules/,
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
        test: regex.json,
        include: paths.src,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          sourceMap: true,
        },
      },

      // HTML
      {
        test: regex.html,
        include: paths.src,
        exclude: /node_modules/,
        loader: 'html-loader',
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
        test: regex.img,
        include: paths.src,
        exclude: /node_modules/,
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
