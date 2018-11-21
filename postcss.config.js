//  Global config
module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'not ie < 10'],
    }),
  ],
};
