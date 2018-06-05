const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCustomerStyle = new ExtractTextPlugin('style.css');
const extractLib = new ExtractTextPlugin('lib.css');

module.exports = {

  entry: {
    bundle: './src/index.js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader' 
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif|ico|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.scss$/,
        include: path.resolve(__dirname, "src"),
        loader: extractCustomerStyle.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.css$/,
        use: extractLib.extract({
          fallback: "style-loader",
          use: ['css-loader']
        })
      },
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx','.scss', '.sass', '.css'],
  },

  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.min.js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      sourceMap: true, 
      minimize: true 
    }),
    extractLib,
    extractCustomerStyle,
    new HtmlWebpackPlugin({
      title: 'MaYi has a zoo !!!',
      template: 'src/index.template.html'
    }),
    new CopyWebpackPlugin([{from: './images', to: './images'}])
  ]
};