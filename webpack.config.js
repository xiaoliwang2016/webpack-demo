const path = require('path')
const htmlConfig = require('./htmlConfig.js')
//html-webpack-plugin 可以把打包后的 CSS 或者 JS 文件引用直接注入到 HTML 模板中
const htmlWebpackPlugin = require('html-webpack-plugin')
//抽离css插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//每次生成前清理dist目录
const CleanWebpackPlugin = require('clean-webpack-plugin')


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
	mode: 'production', //development / production
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
					{ 
						loader: 'css-loader', 
						options: {
							importLoaders: 1,
							//启用sourceMap可以在页面那种找到样式来源，便于调试
							sourceMap: true
						}
					},
					{
					  loader: 'postcss-loader',
					  options: {
					  	//启用sourceMap可以在页面那种找到样式来源，便于调试
					  	sourceMap: true,
					    ident: 'postcss',
					    //autoprefixer是postcss-loader的一个插件，需要安装，用于给css添加前缀
					    plugins: (loader) => [
					    	require('autoprefixer')({browsers: ['> 1% in CN']})
					    ]
					  }
					}
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
				        options: {
				            name: '[path][name].[ext]',//path为相对于context的路径
				            context:'src',
				            publicPath:function(url){//返回最终的资源相对路径
				                return path.relative('dist',url).replace(/\\/g,'/');
				            }
				        }
					}
				]
			},
			{	
				test: /\.(png|svg|jpg|gif|jpeg|ico|woff|woff2|eot|ttf|otf)$/,
				use: [
					{
						loader: 'url-loader', // 根据图片大小，把图片优化成base64
						options: {
						  limit: 10000
						}
					},
				]
			},
			{
				test: /\.tpl$/,
				loader: 'ejs-loader'
			}
		]
	},
	plugins: [
		// 压缩CSS插件
		new OptimizeCSSAssetsPlugin({}),
		//抽离CSS
	    new MiniCssExtractPlugin({
	      filename: "css/[name]-[hash].css",
	      chunkFilename: "[id].css"
	    }),
	    //清理dist目录
	    new CleanWebpackPlugin(['dist']),
		...htmlWebpackPlugins
	]
}