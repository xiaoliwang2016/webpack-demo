const webpack = require('webpack')
const path = require('path')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//每次生成前清理dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(webpackBase, {
	mode: 'production', //development / production
	output: {
		path: path.resolve(__dirname, 'dist'),
		// name：对应entry的key ，chunkhash根据文件进行MD5自动计算
		filename: 'js/[name]-[chunkhash].js',
		//上线时可以使用 publicPath替换根路径 
		// publicPath: 'http://cdn.com/'
	},
	module:{

	},
	plugins: [
		// 压缩CSS插件
		new OptimizeCSSAssetsPlugin({}),
	    //清理dist目录
	    new CleanWebpackPlugin(['dist']),
	]
})