const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const webpack = require("webpack");

console.log(WebpackManifestPlugin);

module.exports = {
  mode: "development", // development production none
  entry: {
    index: {
        import: ["/src/index.js", "webpack-hot-middleware/client?path=/__yejiawei&timeout=10000&overlay=false&reload=true"],
        dependOn: 'shared' // 多入口重复导入代码的分割
    },
    common: {
        import: ["/src/common.js", "webpack-hot-middleware/client?path=/__yejiawei&timeout=10000&overlay=false&reload=true"],
        dependOn: 'shared'
    },
    shared: 'lodash', // 指出那些在多入口中重复import代码需要共用，提取到shared.js中
  },
  optimization: {
    runtimeChunk: 'single', // 单页面的多入口文件代码分割必须加此配置，将多入口的runtime文件放在一起
    splitChunks: {
        chunks: 'all', // 分割所有通过import导入的模块和多入口文件模块
    }
  },
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
      { test: /\.(csv|tsv)$/i, use: ["csv-loader"] },
      { test: /\.xml$/i, use: ["xml-loader"] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./public/index.html" }),
    new CleanWebpackPlugin(), // 清空dist目录
    new webpack.HotModuleReplacementPlugin(), // 开启HMR
    // new WebpackManifestPlugin(), // 生成原始文件和生成文件的映射清单
  ],
};
