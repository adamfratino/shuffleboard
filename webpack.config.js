const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function requiredEnvVar(key) {
  const envVar = process.env[key];

  if (!envVar) {
    throw new Error(`Missing required env var ${key}`);
  }

  return envVar;
}

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, requiredEnvVar('BUILD_DIR')),
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'src'),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'node_modules'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
        },
      },
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
    new webpack.optimize.UglifyJsPlugin(),
  ];
}

module.exports = config
