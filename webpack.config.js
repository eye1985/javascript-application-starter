const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDevEnv = process.env.NODE_ENV !== 'production';
const plugins = [
    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
];

if(!isDevEnv){
    plugins.push(
        new ExtractTextPlugin({
            filename:'style.min.[contenthash].css'
        })
    )
}

module.exports = {
    plugins,
    entry: "./src/app.js",
    output:{
        path: path.join(__dirname,'dist'),
        filename:'app.min.[hash].js'
    },
    module : {
        rules :[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader : "babel-loader"
            },

            {
                test:/\.css$/,
                include: path.join(__dirname, 'src/style'),
                use: isDevEnv ? ['style-loader', 'css-loader'] : ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use : {
                        loader : 'css-loader',
                        options : {
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                })
            }
        ]
    },
    devServer :{
        contentBase: path.join(__dirname, 'dist'),
        compress:true,
        port:3000,
        hot:true,
        watchContentBase: true
    }
};
