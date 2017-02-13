const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: __dirname + "/app.js",
    output:{
        path: path.resolve(__dirname,'dist'),
        filename:'app.min.js',
        publicPath:"/dist/"
    },
    module : {
        rules :[
            {
                test:/\.js$/,
                exclude: /node_modules/,
                loader : "babel-loader"
            }
        ]
    },

    devServer :{
        compress:true,
        port:8181,
        hot:true,
        watchContentBase: true
    }
};
