/* eslint-disable */
require('shelljs/global')
var path = require('path')
var config = require('../config')
var replaceTxt = require('./utils')

// 对首页的路径进行修正
replaceTxt.replaceIndexUrl('./dist')

// static文件合并
// cp('-R', './static', './dist')
// rm('-rf', './static')
if(config.build.publish2WebServer){
    /* eslint no-undef: "error"*/
    rm('-rf', config.build.publishPath + '/dist')
    // 遍历目录，剔除svn文件
    cp('-R', './dist/', config.build.publishPath + '/dist')
//  var src = path.join(path.resolve(__dirname, '../'), './dist')
//  replaceTxt.copyDir(src, config.build.publishPath + '/dist', (err) => {
//    console.log('err', err)
//  })
}

