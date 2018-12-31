const path = require('path')
const htmlConfig = require('./htmlConfig.js')
//生成html插件
const htmlWebpackPlugin = require('html-webpack-plugin')
//抽离css插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var htmlWebpackPlugins = []
var entrys = {}

for(var key in htmlConfig){
	htmlConfig[key].forEach(item => {
		//生成 entry 对象中的 key 例如 { admin-login: './admin/login.html' }
		var k = key + '-' + item

		htmlWebpackPlugins.push(new htmlWebpackPlugin({
			//template设置根据那个模板生成
			template: `./src/${key}/html/${item}.html`,
			//生成html名称
			filename: `./${key}/${item}.html`,
			//chunks 设置需要引入的JS模块
			chunks: [k],
			//自动引入js 可选：true（底部）/body/head
			inject: true,
		}))

		entrys[k] = `./src/${key}/js/${item}.js`
	})
}

module.exports = {
	mode: 'production',
	entry: entrys,
	output: {
		path: path.resolve(__dirname, 'dist'),
		// name：对应entry的key ，chunkhash根据文件进行MD5自动计算
		filename: 'js/[name]-[chunkhash].js',
		//上线时可以使用 publicPath替换根路径 
		// publicPath: 'http://cdn.com/'
	},
	module:{
		rules: [
			{ 
				test: /\.js$/, 
				//排除项
				exclude: path.resolve(__dirname, 'node_modules'),
				//选择项
				include: path.resolve(__dirname, 'src'),
				loader: "babel-loader",
				//babel需要配合 babel-preset-env 一起使用
				query: {
					"presets": ["env"]
				}
			},
			{
				test: /\.css$/,
				//同一个文件需要多个loader的情况下可以使用数组，执行顺序根据数组从后往前执行
				use: [
					//使用MiniCssExtractPlugin.loader代替style-loader抽离css成单独文件
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					//每个loader可以有自己的参数，options字段就是定义参数
					{ loader: 'css-loader', options: {importLoaders: 1}},
					{
					  loader: 'postcss-loader',
					  options: {
					    ident: 'postcss',
					    //autoprefixer是postcss-loader的一个插件，需要安装，用于给css添加前缀
					    plugins: [
					      require('autoprefixer')({
					      	cascade: false
					      })
					    ]
					  }
					}
				]
			},
			{
				test: /\.tpl$/,
				loader: 'ejs-loader'
			}
		]
	},
	plugins: [
	    new MiniCssExtractPlugin({
	      filename: "css/[name].css",
	      chunkFilename: "[id].css"
	    }),
		...htmlWebpackPlugins
	]
}