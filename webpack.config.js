const path = require('path')
const webpack = require('webpack')
//vue编译
const  { VueLoaderPlugin } = require('vue-loader')
//生产html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 文本分离插件，分离js和css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 每次运行打包时清理过期文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');       
// css模块资源优化插件
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');     

//设置环境变量
const isDev = process.env.NODE_ENV === 'development';

const config = {
    target: 'web',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(jpg|png|jpeg|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,   //如果文件大小小于1024字节，就会转义成base64,否则仍然是图片
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE.ENV' : isDev ? '"development"' : '"production"'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: "index.html"
        }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        alias: {
            c: path.resolve(__dirname, 'src/components'),
            p: path.resolve(__dirname, 'src/pages')
        },
        //寻找文件后缀
        extensions: ['.js','.css','.vue','.scss']
    },
    optimization: {
        //对生成的CSS文件进行代码压缩 mode='production'时生效
        minimizer: [
            new OptimizeCssAssetsWebpackPlugin()
        ]
    }
}

//开发模式
if(isDev) {
    config.devServer = {
        port: 8088,
        host: 'localhost',
        overlay: {
           errors: true
        },
        open: true,
        hot: true
    },
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),   //热加载模块
        new webpack.NoEmitOnErrorsPlugin()   //减少我们不需要的信息的展示
    )
    //开发环境中使用css
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: ['style-loader',
                 'css-loader',
                'sass-loader', 
                'postcss-loader'
            ]
        }
    )
}else {
    // config.entry = {
    //     app: path.resolve(__dirname, 'src/index.js'),
    //     vendor: ['vue']
    // },
    config.module.rules.push(
        {
            test: /\.scss$/,
            use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../'
                  }
                 },
                 'css-loader',
                 {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                 },
                'postcss-loader'
             ]
        }
    ),
    config.plugins.push(
        new MiniCssExtractPlugin({
            //为抽取出的独立的CSS文件设置配置参数
            filename: 'css/[name].css',
        })
    ),
    config.output.filename = 'js/[name].js'

}


module.exports = config