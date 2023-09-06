const path = require('path');

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
      "crypto": require.resolve("crypto-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify")
    }
  },
  devtool: 'cheap-module-source-map',
};

