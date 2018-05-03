var path = require ('path');
const autoprefixer = require ('autoprefixer');
const HtmlWebpackPlugin = require ('html-webpack-plugin');

var BUILD_DIR = path.resolve (__dirname, './build');
var APP_DIR = path.resolve (__dirname, './src/client');

const config = {
  entry: {
    main: APP_DIR + '/index.js',
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    chunkFilename: '[id].js',
    publicPath: '',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer ({
                  browsers: ['> 1%', 'last 2 versions'],
                }),
              ],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: 'url-loader?limit=8000&name=public/images/[name].[ext]',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: __dirname + '/public/index.html',
      filename: 'index.html',
      inject: 'body',
      favicon: __dirname + '/public/favicon.ico'
    }),
  ],
};

module.exports = config;
