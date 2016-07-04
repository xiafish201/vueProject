// see http://vuejs-templates.github.io/webpack for documentation.
/**
 * 这个页面只需要改三个地方，
 * 一：22行的port，调试环境的webserver端口
 * 二：18行，true则生成sourcemap，false不生成
 * 三：根据实际情况配置jxddprops
 */
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    assetsSubDirectoryOfDev: 'static',
    assetsPublicPathOfDev: '/',
    productionSourceMap: true,
    publish2WebServer: true,
    publishPath: 'E:/Program/Apache/Apache2.2/htdocs' // 发布到web容器，容器的地址
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    proxyTable: {}
  },
  // 域名属性键值对
  jxddprops: {
    'site.static.url': 'http://static.jxdd.com/suppliers',
    'site.global.url': 'http://g.jxdd.com/global',
    'site.suppliers.url': 'http://suppliers.jxdd.com/suppliers',
    'site.buyer.url': 'http://buyer.jxdd.com/buyer',
    'site.home.url': 'http://home.jxdd.com/home',
    'site.sso.url': 'http://sso.jxdd.com/sso',
    'site.domain': '.jxdd.com',
    'site.detail.url': 'http://detail.jxdd.com'
  }
}
