const webpack = require('webpack')
const path = require('path')
// 引入基础配置文件
const webpackBase = require("./webpack.config.base");
// 引入 webpack-merge 插件
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(webpackBase, {
    mode: 'development',
	devtool:"eval-source-map",
	module:{
		
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	],
    devServer:{
        // 项目根目录
        contentBase: '../assets',
        hot: true,
        port:3001,
        overlay:{
            errors: true,
            warnings: true
        }
    },
})