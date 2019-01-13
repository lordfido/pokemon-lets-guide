import path from 'path';
// @ts-ignore
import UglifyPlugin from 'terser-webpack-plugin';
import ManifestPlugin from 'webpack-pwa-manifest';

import { APP_COLOR, APP_DESC, APP_NAME } from '../src/constants/branding';

export const paths = {
  dist: path.resolve(__dirname, '..', 'dist'),
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '..', 'src'),
};

export const regex = {
  html: /\.html$/,
  img: /\.(png|jpe?g|gif|ico|svg)$/,
  sw: /sw\.js/,
  ts: /\.(tsx?|js)$/,
};

export const loaderImages = {
  loader: 'image-webpack-loader',
  query: {
    // gifsicle
    gifsicle: {
      interlaced: true,
    },
    // mozjpeg
    mozjpeg: {
      progressive: true,
      quality: 65,
    },
    // optipng
    optipng: {
      optimizationLevel: 7,
    },
    // pngquant
    pngquant: {
      quality: '50-90',
      speed: 3,
      verbose: true,
    },
    // SVGO
    svgo: {
      plugins: [{ cleanupIDs: false }],
    },
  },
};

export const manifestPlugin = new ManifestPlugin({
  background_color: APP_COLOR,
  description: APP_DESC,
  icons: [
    {
      size: '512x512',
      src: path.resolve(paths.src, 'images/favicons/icon-512.png'),
    },
    {
      size: '256x256',
      src: path.resolve(paths.src, 'images/favicons/icon-256.png'),
    },
    {
      size: '192x192',
      src: path.resolve(paths.src, 'images/favicons/icon-192.png'),
    },
    {
      size: '180x180',
      src: path.resolve(paths.src, 'images/favicons/icon-180.png'),
    },
    {
      size: '167x167',
      src: path.resolve(paths.src, 'images/favicons/icon-167.png'),
    },
    {
      size: '152x152',
      src: path.resolve(paths.src, 'images/favicons/icon-152.png'),
    },
    {
      size: '144x144',
      src: path.resolve(paths.src, 'images/favicons/icon-144.png'),
    },
    {
      size: '128x128',
      src: path.resolve(paths.src, 'images/favicons/icon-128.png'),
    },
    {
      size: '120x120',
      src: path.resolve(paths.src, 'images/favicons/icon-120.png'),
    },
    {
      size: '96x96',
      src: path.resolve(paths.src, 'images/favicons/icon-096.png'),
    },
    {
      size: '76x76',
      src: path.resolve(paths.src, 'images/favicons/icon-076.png'),
    },
    {
      size: '72x72',
      src: path.resolve(paths.src, 'images/favicons/icon-072.png'),
    },
    {
      size: '48x48',
      src: path.resolve(paths.src, 'images/favicons/icon-048.png'),
    },
    {
      size: '36x36',
      src: path.resolve(paths.src, 'images/favicons/icon-036.png'),
    },
  ],
  name: APP_NAME,
  orientation: 'any',
  short_name: APP_NAME.replace('Pokémon ', ''),
  start_url: '/',
  theme_color: APP_COLOR,
});

export const uglifyPlugin = new UglifyPlugin();

const baseConfig = {
  entry: ['babel-polyfill', path.resolve(paths.src, 'index.tsx')],

  output: {
    filename: '[name]-[hash].js',
    path: paths.dist,
    publicPath: '/',
  },

  module: {
    rules: [
      // JS, TS and TSX
      {
        exclude: /node_modules/,
        include: paths.src,
        test: regex.ts,
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
};

export default baseConfig;
