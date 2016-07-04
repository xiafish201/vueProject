/* eslint-disable */
// https://github.com/shelljs/shelljs
require('shelljs/global')
process.env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')
var utils = require('./utils')

console.log(
    '  Tip:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
)
//var startTime = parseInt(new Date().getTime())
var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory)
rm('-rf', config.build.assetsRoot)
mkdir('-p', config.build.assetsRoot)
// cp('-R', './src/static', config.build.assetsRoot)
var src = path.join(path.resolve(__dirname, '../'), './src/static')
utils.copyDir(src, config.build.assetsRoot + '/static', (err) => {
    console.log('err', err)
})
//console.log('clear dir completed:' + (parseInt(new Date().getTime()) - startTime))

webpack(webpackConfig, function(err, stats) {
    spinner.stop()
    if (err)
        throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
//console.log('build completed:' + (parseInt(new Date().getTime()) - startTime))
})
