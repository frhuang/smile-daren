var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin'); //自动生成带hash的HTML 文件
var ExtractTextPlugin = require("extract-text-webpack-plugin");   //独立样式文件
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;  //混淆压缩
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin; //检测重用模块

var prod = require('./webpack.prod');

// 在命令行 输入  “set PRODUCTION=1 && webpack --progress” 就会打包压缩，并且注入md5戳 到 d.html里面
var production = process.env.PRODUCTION;

var plugins = [

    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),

    // 使用 ProvidePlugin 加载使用率高的依赖库
    new webpack.ProvidePlugin({
        $: 'webpack-zepto'
    }),

    //new ExtractTextPlugin("[name].css" )
    //自动分析重用的模块并且打包成单独的文件
    new CommonsChunkPlugin(production ? "vendor.[hash].js" : "vendor.js" )

];


//发布编译时，压缩，版本控制
if (process.env.PRODUCTION) {

    // 清除之前的上线文件
    prod.folder('./output/static/');

    //压缩
    plugins.push(new webpack.optimize.UglifyJsPlugin({compress: {warnings: false } }));

    // 生成模板文件
    plugins.push(new HtmlWebpackPlugin({
        filename:'../index.html',//会生成index.html在根目录下,并注入脚本
        template:'index.tpl',
        inject:true //此参数必须加上，不加不注入
    }))

}

module.exports = {

    //入口文件，path.resolve()方法，可以结合我们给定的两个参数最后生成绝对路径，最终指向的就是我们的app.js文件
    entry: path.resolve(__dirname, './src/main.js'),

    // 输出配置
    output: {
        // 输出路径是
        path: path.join(__dirname, '/output/static'),
        publicPath: production ? "./static/" :"static/",
        filename: production ? "build.[hash].js" : "build.js",//[hash]MD5戳解决html的资源的定位可以使用webpack提供的HtmlWebpackPlugin插件来解决这个问题  见：http://segmentfault.com/a/1190000003499526 资源路径切换
        chunkFilename: '[id].[chunkhash].js'
    },

    // 添加的module属性
    module: {
        loaders: [
            // 使用vue-loader 加载 .vue 结尾的文件
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            // 使用babel,编译ES6语法
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                // loader: "css-loader?sourceMap!cssnext-loader"
                loader: "style-loader!css-loader?sourceMap!cssnext-loader"
            },
            {
                test: /\.scss$/,
                // loader: "css-loader?sourceMap!sass-loader!cssnext-loader"
                loader: "style-loader!css-loader?sourceMap!sass-loader!cssnext-loader"
            },
            // 内联 base64 URLs, 限定 <=10k 的图片, 其他的用 URL
            {
                test: /\.(png|jpg|svg)$/,
                // loader: 'url-loader?limit=8192'
                loader: 'file-loader',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
        ]
    },
    // 插件项
    plugins:plugins,

    stats: {
        // Nice colored output
        colors: true
    },

    // 自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名,require('file') 代替 require('file.coffee')
    resolve: {
        extensions: ['', '.js']
    },

    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};