const path = require('path');

const config = {
  devtool: 'cheap-module-eval-source-map',
  name: 'client',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            // 'transform-runtime',
            // 'transform-react-display-name',
            // 'transform-export-extensions',
            'transform-class-properties',
          ],
        },
      },
    ],
  },
};

module.exports = config;
