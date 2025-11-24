const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'background-workspace': './index-workspace.js',
    'background-auth': './index-auth.js',
    'background-import': './index-import.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      return `${chunkData.chunk.name}.js`;
    },
  },
  resolve: {
    fallback: {
      "crypto": false,
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify")
    }
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { 
          from: 'node_modules/passbolt-styleguide/src/locales/**/*.json',
          to({ absoluteFilename }) {

            // Extract the locale from the absoluteFilename
            const locale = absoluteFilename.match(/node_modules\\passbolt-styleguide\\src\\locales\\([a-zA-Z-]+)\\.+/)[1];
            // Construct the new path using the extracted locale
            const newPath = `locales/passbolt-${locale}/common.json`;
            // Return the new path to avoid UWP to interpret it as a locale for the all apps and move the JS to UWP usage which we do not want
            return newPath;
          },
        },
      ],
    }),
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['background-workspace.js', 'background-auth.js', 'background-import.js'],
      rules: [{
          search: '/locales/{{lng}}/{{ns}}.json',
          replace: 'https://background.dist/Background/dist/locales/passbolt-{{lng}}/{{ns}}.json'
      },
      {
        search: '/locales/add/{{lng}}/{{ns}}',
        replace: 'https://background.dist/Background/dist/locales/add/passbolt-{{lng}}/{{ns}}'
      }]
   }]),
  ],
  devtool: 'cheap-module-source-map',
};

