const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var OptimizeJsPlugin = require('optimize-js-plugin');

var env = process.env.NODE_ENV || 'development';
var plugins = [
new HtmlWebpackPlugin({
        template: 'index.html',
        filename: 'index.html',
        inject: 'body',
    })
];

console.log('NODE_ENV:', env);

if (env === 'production') {
plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  );
}
console.log(__dirname);
//webpack.config.js
module.exports = {
    entry: (env !== 'production' ? [ 
        'react-hot-loader/patch',
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/only-dev-server',
        ] : []).concat(['./client/index.js']) ,
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: './bundle.js'
    },
    module: {
    	rules: [
    		{
    			test: /\.js$/,
    			loader: "babel-loader",
    			exclude: path.resolve(__dirname, 'node_modules') 
    		},
    		{
       			test: /\.css$/,
        		use: [
            		{ loader: 'style-loader'},
            		{
                		loader: 'css-loader',
                		options: {
                    		modules: true
                		}
            		}
        		],
				exclude: path.resolve(__dirname, 'node_modules')
    		}
    	]
    },
    plugins: plugins
};
