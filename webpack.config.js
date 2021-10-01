const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === "development";

// filename: "[name].[contenthash].css",
const extractSass = new MiniCssExtractPlugin({
    filename: isDevelopment ? "[name].css":"[name].[contenthash].css"
});

const plugins = [
    extractSass,
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(isDevelopment ? 'development' : 'production')
        }
    }),
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
];

//Use this if you dont want dev server
const watch = isDevelopment ? true : false;

const assetPublicPath = isDevelopment ? "" : "";

module.exports = {
    plugins,
    entry: {
        "main": "./src/app.js",
    },

    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].min.js"
    },

    mode : isDevelopment ? 'development':'production',

    //Alias for absolute path if needed
    resolve: {
        extensions: ['.js', ".scss", ".css"],
        alias: {
            root: __dirname,
            src: path.resolve(__dirname, 'src'),
        },
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },

            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },

            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name].[ext]',
                    publicPath: assetPublicPath
                }
            },

            {
                test: /\.(svg|jpg|jpeg|png|bmp)$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[ext]',
                    publicPath: assetPublicPath
                }
            }
        ]
    },

    devServer :{
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress:true,
        port:3000,
        hot:true,
    }
}
