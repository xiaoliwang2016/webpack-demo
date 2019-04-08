const webpack = require('webpack')

const path = require('path')

// html-webpack-plugin两个作用：
// 1.为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
// 2.可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
const HtmlWebpackPlugin = require('html-webpack-plugin')
// mini-css-extract-plugin作用：
// 1. 将css代码从打包后的文件中抽离
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
	mode: 'development',
	//入口
	entry: path.resolve(__dirname, 'src/admin/main.js'),
	//出口
	output: {
		path: path.resolve(__dirname, 'dist/admin'),
		filename: 'bundle.js'
	},

	module: {
		// rules: 接收一个Rule对象数组
		rules: [
			{
				test: /\.css$/,
				// use: 接收一个UseEntry对象数组, webpack调用的顺序是从后往前
				use: [
					// {
					// 	loader: 'style-loader'
					// },
					//使用MiniCssExtractPlugin.loader代替style-loader抽离css成单独文件
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							//启用sourceMap可以在页面那种找到样式来源，便于调试
							sourceMap: true
						}
					},
					{
						// postcss-loader 是一个css预处理工具，它支持很多插件，例如：autoprefixer
						loader: 'postcss-loader',
						options: {
						  	//启用sourceMap可以在页面那种找到样式来源，便于调试
						  	sourceMap: true,
						    ident: 'postcss',
						    // autoprefixer是postcss-loader的一个插件，需要安装，用于给css添加前缀
						    plugins: (loader) => [
						    	require('autoprefixer')({browsers: ['> 1% in CN']})
						    ]
						}
					}
				]
			}
		]
	},

	plugins: [

		new HtmlWebpackPlugin({
			template: 'src/admin/index.html',
			filename: 'index.html'
		}),

		new MiniCssExtractPlugin({
			//抽离后的 css保存规则, 保存文件名添加 hash避免缓存
	    	filename: "css/[name]-[hash].css",
      		chunkFilename: "[id].css"
		})
	]
}