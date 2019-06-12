const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
require("@babel/polyfill");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, 'src'),
                    path.resolve(__dirname, 'index.js')
                ],
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }]
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                loader: "file-loader",
            }
        ],
    },
    devServer: {
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "*"
        }
    },
    plugins: [htmlPlugin],
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    }
};