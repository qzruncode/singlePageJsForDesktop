const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

console.log(WebpackManifestPlugin)

module.exports = {
    mode: 'development', // development production none
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
        publicPath: './',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' },
            { test: /\.css$/i, use: ['style-loader', 'css-loader'], },
            { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: 'asset/resource', },
            { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource', },
            { test: /\.(csv|tsv)$/i, use: ['csv-loader'], },
            { test: /\.xml$/i, use: ['xml-loader'], }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './public/index.html' }),
        new CleanWebpackPlugin(), // 清空dist目录
        // new WebpackManifestPlugin(), // 生成原始文件和生成文件的映射清单
    ]
};
