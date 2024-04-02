const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'rendered-workspace': './index-workspace.js',
    'rendered-auth': './index-auth.js',
    'rendered-import': './index-import.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: (chunkData) => {
      return `${chunkData.chunk.name}.js`;
    },
  },
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom'),
      'react-router-dom': path.resolve('./node_modules/react-router-dom'),
      'react-i18next': path.resolve('./node_modules/react-i18next'),
    },
    extensions: ["*", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules[\\/]((?!(passbolt\-styleguide))))/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/react"],
        },
      }
    ],
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
        { from: 'node_modules/passbolt-styleguide/build/css/themes', to: 'themes'},
        { from: 'node_modules/passbolt-styleguide/src/fonts', to: 'fonts'},
      ]
    }),
    new ReplaceInFileWebpackPlugin([{
      dir: 'dist',
      files: ['rendered-workspace.js', 'rendered-auth.js', 'rendered-import.js'],
      rules: [
        {
          search: '/webAccessibleResources/',
          replace: 'https://rendered.dist/Rendered/'
        },
        {
          search: 'https://rendered.dist/Rendered/dist/locales/{{lng}}/',
          replace: 'https://rendered.dist/Rendered/dist/locales/passbolt-{{lng}}/'
        },
      ]
    }]),
  ],
  devtool: "inline-source-map"
};
