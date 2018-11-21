import webpack from 'webpack';
import path from 'path';
// import jsonImporter from 'node-sass-json-importer';
import ManifestPlugin from 'webpack-pwa-manifest';
// @ts-ignore
import TerserPlugin from 'terser-webpack-plugin';
import postcssConfig from '../postcss.config';
import { APP_NAME, APP_DESC, APP_COLOR } from '../src/constants/branding';

export const paths = {
  root: path.resolve(__dirname, '..'),
  src: path.resolve(__dirname, '..', 'src'),
  dist: path.resolve(__dirname, '..', 'dist'),
};

export const regex = {
  ts: /\.ts$/,
  tsx: /\.tsx$/,
  js: /\.js$/,
  css: /\.s?css$/,
  img: /\.(png|jpe?g|gif|ico|svg)$/,
  fonts: /\.(woff|woff2|ttf|eot|svg)$/,
  html: /\.html$/,
  json: /\.json$/,
  sw: /sw\.js/,
};

export const loaderPostCSS = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: [...postcssConfig.plugins],
  },
};

export const loaderSass = {
  loader: 'sass-loader',
  options: {
    sourceMap: true,
    // importer: jsonImporter(),
  },
};

export const loaderImages = {
  loader: 'image-webpack-loader',
  query: {
    // mozjpeg
    mozjpeg: {
      progressive: true,
      quality: 65,
    },
    // gifsicle
    gifsicle: {
      interlaced: true,
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
  name: APP_NAME,
  description: APP_DESC,
  short_name: APP_NAME,
  background_color: APP_COLOR,
  theme_color: APP_COLOR,
  start_url: '/',
  orientation: 'any',
  icons: [
    // {
    //   size: '512x512',
    //   src: path.resolve(paths.src, 'images/favicons/icon-512.png'),
    // },
    // {
    //   size: '256x256',
    //   src: path.resolve(paths.src, 'images/favicons/icon-256.png'),
    // },
    // {
    //   size: '192x192',
    //   src: path.resolve(paths.src, 'images/favicons/icon-192.png'),
    // },
    // {
    //   size: '180x180',
    //   src: path.resolve(paths.src, 'images/favicons/icon-180.png'),
    // },
    // {
    //   size: '167x167',
    //   src: path.resolve(paths.src, 'images/favicons/icon-167.png'),
    // },
    // {
    //   size: '152x152',
    //   src: path.resolve(paths.src, 'images/favicons/icon-152.png'),
    // },
    // {
    //   size: '144x144',
    //   src: path.resolve(paths.src, 'images/favicons/icon-144.png'),
    // },
    // {
    //   size: '128x128',
    //   src: path.resolve(paths.src, 'images/favicons/icon-128.png'),
    // },
    // {
    //   size: '120x120',
    //   src: path.resolve(paths.src, 'images/favicons/icon-120.png'),
    // },
    // {
    //   size: '96x96',
    //   src: path.resolve(paths.src, 'images/favicons/icon-096.png'),
    // },
    // {
    //   size: '76x76',
    //   src: path.resolve(paths.src, 'images/favicons/icon-076.png'),
    // },
    // {
    //   size: '72x72',
    //   src: path.resolve(paths.src, 'images/favicons/icon-072.png'),
    // },
    // {
    //   size: '48x48',
    //   src: path.resolve(paths.src, 'images/favicons/icon-048.png'),
    // },
    // {
    //   size: '36x36',
    //   src: path.resolve(paths.src, 'images/favicons/icon-036.png'),
    // },
  ],
});

export const uglifyPlugin = new TerserPlugin();

const baseConfig: webpack.Configuration = {
  entry: [
    'babel-polyfill',
    'webpack-dev-server/client?https://0.0.0.0:8080/',
    'webpack/hot/dev-server',
    path.resolve(paths.src, 'index.tsx'),
  ],

  output: {
    path: paths.dist,
    filename: '[name]-[hash].js',
    publicPath: '/',
  },

  module: {
    rules: [
      // JS, TS and TSX
      {
        test: /\.(ts|tsx|js)$/,
        include: paths.src,
        exclude: /node_modules/,
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
    extensions: ['.js', '.ts', '.tsx'],
  },
};

export default baseConfig;
