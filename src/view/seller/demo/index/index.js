//require('static/css/mui.css')
require('static/css/iconfont.css')

import Vue from 'vue'
import app from './app'
//import logger from 'common/logUtils'
//import prop from 'common/propUtils'
import uitls from 'common/utils'
import {prop,logger,query,queryAll} from 'common/utils'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {
    app
  },
  ready: function() {
      logger.log(prop.getProperty('test'),'index/index.js');
      prop.setProperty('test','lxm');
      logger.log(prop.getProperty('test'),'index/index.js');
      logger.debug(prop.getProperty('test'),'index/index.js');
      logger.info(prop.getProperty('test'),'index/index.js');
      logger.error(prop.getProperty('test'),'index/index.js');
      logger.warn(prop.getProperty('test'),'index/index.js');
      logger.log(queryAll('img'));
      logger.log(prop.setProperty('test','lxm'),'index/index.js');
  }
})
