const webpack = require('webpack');
const path = require('path');
// const WebpackHtmlCopyExternal =  require('./plugins/index');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// var HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
  'mode':'development',
  entry: './src/app.js',
  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'webpack.bundle.js',
  },
  // externals: {
  //   'vue': 'Vue',
  //   // 'element-ui': 'ELEMENT',
  //   'lodash': '_'
  // },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
      {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: { 
              limit: 10000
          },
      },
    ],
  },
  devServer: {
    contentBase: './dist',
  },
  plugins:[
    new HtmlWebpackPlugin({
        template: './template.html'
    }),
    // new HtmlWebpackTagsPlugin({ tags: ['libs/alib.js'], append: true })
    new AddAssetHtmlPlugin({ filepath: require.resolve('./libs/alib.js') }),

    new webpack.DllReferencePlugin({
      // 由于我们dll文件是在 /dll 目录下构建的，所以这里相应的，需要提供context路径。默认dll是跟使用者工程的context一致。
      context: path.join(__dirname, "..", "dll"),
      manifest: require("./dll/dist/vendor.manifest.json") // eslint-disable-line
    }),
  	// new WebpackHtmlCopyExternal({
    //   buildDir: path.resolve(__dirname, './dist'),
    //   node_modules: path.resolve(__dirname, './node_modules'),
    // })
  ]
};