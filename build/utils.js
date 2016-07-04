/* eslint-disable */
var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')
var fs = require('fs')

var encode = function(a) {
  var reg = /([^\w\d\s])/g
  return a.replace(reg, '\\' + '$1')
}

exports.assetsPath = function(_path) {
  var file = path.posix.join(process.env.NODE_ENV === 'production' ? config.build.assetsSubDirectory : config.build.assetsSubDirectoryOfDev, _path)
  //console.log(process.env.NODE_ENV+'file path:' + file);
  return file
}

exports.cssLoaders = function(options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders(loaders) {
    var sourceLoader = loaders.map(function(loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function(options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

/**
 * 入口文件处理方法
 * @param globPath String 路径，支持正则
 * 这里也可以处理任意层级目录，鉴于规范，直接定义成固定层级
 * 返回路径对象
 */
exports.getEntry = function(globPath) {
  var entries = {}
  //var basename
  var tmp = ''
  var tmp1 = ''
  var pathname = ''

  glob.sync(globPath).forEach(function(entry) {
    //  basename = path.basename(entry, path.extname(entry))
    tmp1 = entry.split('/')
    tmp = entry.split('/').splice(-3)
    if (tmp1[3] == tmp[0]) {
      pathname = tmp.splice(0, 1) + '/' + tmp.splice(0, 1) // 正确输出js和html的路径
    } else {
      pathname = tmp1[3] + '/' + tmp.splice(0, 1) + '/' + tmp.splice(0, 1) // 正确输出js和html的路径
    }
    //  console.log(entry+'basename:' + basename + '\n tmp:' + tmp + '\n tmp1:'+tmp1)

    //  console.log('pathname:'+pathname)
    entries[pathname] = entry
  })
  //处理首页
  entries['index'] = './src/index.js'
  return entries
}

/**
 * 替换指定目录下的html文件里的字符串
*/
exports.replaceTxt = function(oldtxt, newtxt, fileType, dir) {
  var _dir = path.join(path.resolve(__dirname, '../'), dir)
  var reg = _dir + '/**/*.' + (fileType == '' ? 'html' : fileType)
  //	console.log(reg)
  glob(reg, {
    nodir: true
  }, function(err, files) {
    if (err) {
      throw err
    } else {
      for (var i = 0; i < files.length; i++) {
        (function(i) {
          fs.readFile(files[i], 'utf8', function(er, data) {
            if (er) {
              throw er
            }
            var pattern = new RegExp(encode(oldtxt), 'g')
            if (!pattern.test(data)) {
              return
            }
            fs.writeFile(files[i], data.replace(pattern, newtxt), function(error) {
              if (error) {
                throw error
              }
              console.log("match and success --- " + files[i])
            })
          })
        })(i)
      }
    }
  })
}

/**
 * 替换指定目录下的html文件里的字符串
*/
exports.replaceTxtConfig = function(configPath, dir) {
  var configPath = path.resolve(__dirname, configPath)
  var config = require(configPath)
  var properties = config.jxddprops
  //文件类型
  var fileTypes = {
    'file.js': 'js',
    'file.css': 'css',
    'file.html': 'html',
    'file.vue': 'vue'
  }
  for (var prop in properties) {
    if (properties.hasOwnProperty(prop)) {
      for (var ft in fileTypes) {
        if (fileTypes.hasOwnProperty(ft)) {
          this.replaceTxt(prop, properties[prop], fileTypes[ft], dir)
        }
      }
    }
  }
}

exports.replaceIndexUrl = function(dir) {
  replaceFile('../../static', './static', dir + '/index.html')
//修复static目录层级，只能指定目录修复，目前就两个目录：buyer、seller
//this.replaceTxt('../static','../../static','html','./dist/buyer')
//this.replaceTxt('../static','../../static','html','./dist/seller')
//this.replaceTxt('static','../static','js','./dist/buyer')
//this.replaceTxt('static','../static','js','./dist/seller')
//this.replaceTxt('static','../static','css','./dist/buyer')
//this.replaceTxt('static','../static','css','./dist/seller')
}

const replaceFile = function(oldStr, newStr, filePath) {
  var p = path.join(path.resolve(__dirname, '../'), filePath)
  //  console.log('p:'+p)
  fs.readFile(p, 'utf8', function(er, data) {
    if (er) {
      throw er
    }
    var pattern = new RegExp(encode(oldStr), 'g')
    if (!pattern.test(data)) {
      return
    }
    fs.writeFile(p, data.replace(pattern, newStr), function(error) {
      if (error) {
        throw error
      }
    })
  })
}
/**
 * [description] 文件复制，排除svn相关文件
 * @param  {[type]}   src      [源路径]
 * @param  {[type]}   dist     [目的路径]
 * @param  {Function} callback [回调函数]
 * @return {[void]}            [无返回]
 */
const copyDir = (src, dist, callback) => {
  // dist = path.join(path.resolve(__dirname, '../'), dist)
  console.log('dist', dist);
  fs.access(dist, function(err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist);
    }
    _copy(null, src, dist);
  });

  var _copy = (err, src, dist) => {
    if (err) {
      callback(err);
    } else {
      fs.readdir(src, function(err, paths) {
        if (err) {
          callback(err)
        } else {
          paths.forEach(function(path) {
            var _src = src + '/' + path;
            var _dist = dist + '/' + path;
            console.log('src', src);
            if (_src.indexOf('.svn') != -1) {
              return false
            }
            fs.stat(_src, function(err, stat) {
              if (err) {
                callback(err);
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  console.log('_src', _src);
                  fs.writeFileSync(_dist, fs.readFileSync(_src));
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

exports.copyDir = copyDir
