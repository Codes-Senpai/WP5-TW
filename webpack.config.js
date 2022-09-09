const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CreateFileWebpack = require('create-file-webpack');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const stylesHandler = MiniCssExtractPlugin.loader;

const isProduction = process.env.NODE_ENV == "production";

let htaccessoptions = {
    // path to folder in which the file will be created
    path: './dist',
    // file name
    fileName: '.htaccess',
    // content of the file
    content: 'Allow From All'
};



const config = {
    entry: {
        "main/theme-name-loader": path.resolve(__dirname, 'src','index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].min.js',
      clean: true
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/i,
            loader: "babel-loader",
          },
          {
            test: /\.s[ac]ss$/i,
            use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
          },
          {
            test: /\.css$/i,
            use: [stylesHandler, "css-loader", "postcss-loader"],
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
            type: "asset",
          },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
        title: "test",
      }),
    new MiniCssExtractPlugin(),
    new CreateFileWebpack(htaccessoptions),
    ],
    watchOptions: {
        ignored: ['./node_modules/']
    },
    mode: "development" //development, production or none
};

module.exports = () => {
    if (isProduction) {
    config.mode = "production";
    
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
    config.mode = "development";
    }
    return config;
};