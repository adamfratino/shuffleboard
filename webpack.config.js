const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      filename: 'index.html',
      template: path.resolve(__dirname, 'static/index.html'),
    }),
  ],
};

if (process.env.NODE_ENV === 'development') {
  config.plugins = [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ];

  config.devtool = 'eval-source-map';
  config.devServer = {
    hot: true,
    contentBase: path.resolve(__dirname, 'static'),
    port: 8000,
  };
}

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    ...config.plugins,
    // new webpack.optimize.UglifyJsPlugin(),
  ];
}

module.exports = config
