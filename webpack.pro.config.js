const path = require('path')
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLess = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: process.env.NODE_ENV === "development"
});


module.exports = {
	entry: {
		app: path.resolve(__dirname,'app/index'),
		vendor: [
			'react', 
			'react-dom', 
			'react-redux', 
			'react-router', 
			'redux', 
			'whatwg-fetch',
			'react-addons-pure-render-mixin',
			'es6-promise'
		]
	},
	output:{
		path: path.resolve(__dirname,'dist'),
		filename:"[name].[chunkhash:8].js",
		publicPath:'/'
	},
	resolve:{
		extensions:['*','.js','.jsx'],
		alias: {
            '@': path.resolve(__dirname,'app')
        }
	},
	module:{
		rules:[
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ["react", "es2015"],
						plugins: [
							["react-transform", {
								"transforms": [{
									"transform": "react-transform-hmr",
									"imports": ["react"],
									"locals": ["module"]
								}]
							}]
						]
					}
				}
			},
			{
				test: /\.less$/,
				exclude: /(node_modules|bower_components)/,
				use: extractLess.extract({
					use: [
						{
							loader: "css-loader"
						}, 
						{
							loader: "less-loader"
						}
					],
					// use style-loader in development
					fallback: "style-loader"
				})
			},
			{
				test:/\.css/,
				exclude: /(node_modules|bower_components)/,
				use: extractLess.extract({
					use: [ 
                        { 
                            loader: 'css-loader', 
                            options: { importLoaders: 1 } 
                        },
                        {
                            loader:'postcss-loader',
                            options: {
                                plugins: (loader) => [
                                    require('autoprefixer')(),
                                ]
                            }
                        }
                    ],
					// use style-loader in development
					fallback: "style-loader"
				})
			},
			{
                test: /\.(png|jpg|gif)$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                    loader: 'url-loader',
                        options: {
                          limit: 8192
                        }
                    }
                ]
            },  // 限制大小5kb
            { 
                test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
                exclude: /(node_modules|bower_components)/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit: 5000
                        }
                    }
                ]
            }
		]
	},

	plugins: [
        extractLess,
        // html 模板插件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        // 定义为生产环境，编译 React 时压缩到最小
	    new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
	    }),
	   
	   	// 压缩插件
    	new webpack.optimize.UglifyJsPlugin({
	        mangle: {
	            except: ['$super', '$', 'exports', 'require', 'module', '_']
	        },
	        compress: {
	            warnings: false
	        },
	        output: {
	            comments: false,
	        }
	    }),
	    // 提供公共代码
	    new webpack.optimize.CommonsChunkPlugin({
	      name: 'vendor',
	      filename: '[name].[chunkhash:8].js'
	    }),

	    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
	    new webpack.DefinePlugin({
	      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
	    })


    ]
}