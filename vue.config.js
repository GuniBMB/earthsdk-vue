const path = require('path')
const webpack = require('webpack')
// const CopyWebpackPlugin = require('copy-webpack-plugin')

function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        ],
        performance:{
            // false | "error" | "warning" // 不显示性能提示 | 以错误形式提示 | 以警告...
            hints: "warning",
            // 开发环境设置较大防止警告
            // 根据入口起点的最大体积，控制webpack何时生成性能提示,整数类型,以字节为单位
            maxEntrypointSize: 50000000,
            // 最大单个资源体积，默认250000 (bytes)
            maxAssetSize: 30000000
        },
        output: {
            sourcePrefix: ' '
        },
        amd:{
            toUrlUndefined: true
        },
        module: {
            unknownContextCritical: /^.\/.*$/,
            // eslint-disable-next-line no-dupe-keys
            unknownContextCritical: false,
            rules:[
                {
                    test:/\.less$/,
                    loader:'less-loader'
                }
            ]
        }
    },
    chainWebpack:(config)=>{
        // 别名
        config.resolve.alias.set('@$', resolve('src'))
    },
    css:{

    },
    productionSourceMap: false,//生产环境不上传源码
    publicPath: '/earth-demos/',
    devServer: {
        port: 3030,
        /*proxy: {

        }*/
    },
    lintOnSave: false,//忽略eslint提示
    // babel-loader no-ignore node_modules/*
    transpileDependencies: []
}