const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/main.js'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname+'/app/')
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin(
            {
                filename: "main.css",
            }
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from:  path.resolve(__dirname + '/src/img/'),
                    to:  path.resolve(__dirname+'/app/img')
                }
            ]
        }),
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                filename: 'index.html',
                inject: false
            }
        )
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss|css$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false
                        }
                    },
                    'sass-loader'
                ]
            },
            {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: 'file-loader',
            options: {
                outputPath: 'fonts/',
                name: '[name].[ext]'
              }
           }
        ]
    }
};