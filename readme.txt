在命令行中输入：
npm run dev 进入开发模式
npm run build 进入打包模式

webpack 会自动加载根目录下 webpack.config.js 文件

const env = process.env.NODE_ENV.replace(/(\s*$)|(^\s*)/ig,"")这行代码读取 process.env.NODE_ENV 的值
process 是线程内全局对象，通过cross-env能跨平台地设置及使用环境变量，cross-env需要手动安装
安装完成后可以在命令行输入 cross-env NODE_ENV=prod webpack --progress --colors 设置 process.env.NODE_ENV 的值为 prod，并启动webpack打包

根据从 process.env.NODE_ENV 的值读取对应的配置文件

开发模式和打包模式下很多配置都是一样的，避免重复配置，可以将通用配置抽出到 webpack.config.base.js, 通过 webpack-merge 工具在 dev 或者 prod 中合并
webpack-merge 需要手动安装


更多配置参考：https://malun666.github.io/aicoder_vip_doc/#/pages/vip_2webpack?id=%E5%8A%A0%E8%BD%BD-sass-%E6%96%87%E4%BB%B6