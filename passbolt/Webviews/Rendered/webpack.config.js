const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
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
        { from: 'node_modules/passbolt-styleguide/src/locales', to: 'locales' },
        { from: 'node_modules/passbolt-styleguide/build/css/themes', to: 'themes'},
        { from: 'node_modules/passbolt-styleguide/src/fonts', to: 'fonts'},
      ]
    })
  ],
  devtool: "inline-source-map"
};
