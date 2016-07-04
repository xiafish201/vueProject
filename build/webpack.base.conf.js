var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

var entries = utils.getEntry('./src/view/**/*.js') // 获得入口js文件
var chunks = Object.keys(entries)

module.exports = {
  entry: entries,
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: utils.assetsPath('js/[name].js'),
    chunkFilename: utils.assetsPath('js/[id].js')
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    // 别名配置
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'static': path.resolve(__dirname, '../src/static'),
      'common': path.resolve(__dirname, '../src/common'),
      'component': path.resolve(__dirname, '../src/component'),
      'view': path.resolve(__dirname, '../src/view'),
      'store': path.resolve(__dirname, '../src/store'),
      'library': path.resolve(__dirname, '../src/library'),
      'filter': path.resolve(__dirname, '../src/filter'),
      'directive': path.resolve(__dirname, '../src/directive')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
//  preLoaders: [
//    {
//      test: /\.vue$/,
//      loader: 'eslint',
//      include: projectRoot,
//      exclude: /node_modules/
//    },
//    {
//      test: /\.js$/,
//      loader: 'eslint',
//      include: projectRoot,
//      exclude: /node_modules/
//    }
//  ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  plugins: [
    // 提取公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors', // 公共模块的名称
      chunks: chunks,  // chunks是需要提取的模块
      minChunks: chunks.length //js文件被每一个页面引用才提取出来
    })
  ]
}

var pages = utils.getEntry('./src/view/**/*.html')
var prod = process.env.NODE_ENV === config.build.env
for (var pathname in pages) {
  // 配置生成的html文件，定义路径等
  var conf = {
    filename: prod? config.build.assetsRoot + pathname + '.html' : pathname + '.html',
    template: pages[pathname], // 模板路径
    inject: true,              // js插入位置
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  if (pathname in module.exports.entry) {
    conf.chunks = ['vendors', pathname]
    conf.hash = false
  }
  //首页
  if('index'===pathname){
    conf.template = './src/index.html'
  }
//console.log('pages:'+JSON.stringify(conf))
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}
