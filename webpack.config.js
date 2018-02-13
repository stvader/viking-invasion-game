const path = require('path');
const glob = require('glob');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/*const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;*/

module.exports = {
    entry: glob.sync('./js/src/**/*.js'),   
    /*entry: glob.sync('./js/src/index.js'),*/  
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
        	{
        		enforce: 'pre', 
        		test: /\.js$/, 
        		loader: 'eslint-loader'
        	},
        	{
                 test: /\.js$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015']
                 }
            }
            
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 9000        
    },
    plugins: [        
    	/*new UglifyJsPlugin(),*/

        new CopyWebpackPlugin([
            {
                from: '*.html',
                to: '.'
            },

            {
                from: 'css',
                to: 'css'
            },

            {
                from: 'fonts',
                to: 'fonts'                
            },

            {
                from: 'webfonts',
                to: 'webfonts'                
            },

            {
                from: 'img',
                to: 'img'                
            },

            {
                from: 'sound',
                to: 'sound'                
            }
        ], {
            copyUnmodified: false
        })
    ]
}
