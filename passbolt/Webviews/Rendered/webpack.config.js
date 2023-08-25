const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'rendered-workspace': './index-workspace.js',
    'rendered-auth': './index-auth.js',
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
        { from: 'node_modules/passbolt-styleguide/src/locales', to: 'locales' },
        { from: 'node_modules/passbolt-styleguide/build/css/themes', to: 'themes'},
        { from: 'node_modules/passbolt-styleguide/src/fonts', to: 'fonts'},
      ]
    })
  ],
  devtool: "inline-source-map"
};
