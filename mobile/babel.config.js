module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias:   {
              pages: './src/pages',
              assets: './src/assets',
              services: './src/services',
          }
        }
      ]
    ]
  };
};
