

<template>
  <div id="lxm">
    <img class="logo" :src='imgs'>
    <hello @click='sayHello' :hello='hello' v-show='1'></hello>
    <Counterslxm></Counterslxm>
    <span style="color:red">{{alertMsg}}</span>
  </div>
</template>

<script>
// 这里配置了resolve.alias，所以可以使用短路径
import Hello from 'component/Hello'
import Counterslxm from 'component/Counters'
import utils from 'common/utils'
import logger from 'common/logUtils'
var count = 0
var isChecked = false
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
// 不加跨域xhr会发起options请求
Vue.http.options.headers={
    'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
}
// post的时候会把JSON对象转成formdata
Vue.http.options.emulateJSON=true
var callback = (data) => {
        console.log('cb:'+data);
    }
export default {
	data: function() {
		return {
			alertMsg:'',
			imgs:require('../index/assets/img/logo.png')
		}
	},
	props: {
		hello: String,
		propB: {
      type: String,
      required: true
    }
	},
  components: {
    Hello,
    Counterslxm
  },
  methods: {
  	sayHello: function() {
  		this.alertMsg = this.propB+':'+this.hello + '===='+count++
  		this.$parent['test']('test')
  		this.imgs = (isChecked = !isChecked)?'http://vuejs.org.cn/images/logo.png':require('../index/assets/img/bg.png')
  		logger.info(this.imgs,'test 41');
//		location.href = '/order/index.html' + '?p='+count;
  		this.open('/order/index.html','',{a:'aa',show:{a:'444'}});
  		var cb2 = this.cb22;
  		// GET /someUrl
      this.$http.jsonp('http://192.168.2.98:8000/api/listdata',{page:2}).then((response) => {
          // success callback
          console.log(response.status + ' :sucess  ' + JSON.stringify(response.data));
      }, (response) => {
          // error callback
          console.log(response.status + ' :error ' + response.data);
      });
  	},
  	cb22:(data) => {
  	    alert('cb:'+data);
  	},
  	open: function(url,id,options) {
  	    var id = id || url;
        var options = options || {};

        if (typeof id === 'object') {
            options = id;
            id = url;
        }

        options.show = options.show || {a:'123'};
        console.log('url:'+url+' id:'+id+' options:'+JSON.stringify(options));

        var a = {header:{a:'123'},text:'1111'};
        var b = 'a';
        console.log(a.hasOwnProperty('text'));
        console.log(a.header.hasOwnProperty('text'));
        console.log(a.header.hasOwnProperty([b]));
        console.log(a.header.hasOwnProperty('b'));

  	}
  },
  ready: function() {

  },
  nextTick: function() {
      setInterval(function() {
                this.imgs = (isChecked = !isChecked)?'http://vuejs.org.cn/images/logo.png':require('../index/assets/img/bg.png')
                utils.query('.logo').src=this.imgs
                console.log(this.imgs)
            }, 1000);
  }
}
</script>

<style scoped>
		html {
		  height: 100%;
		}

		body {
		  display: flex;
		  align-items: center;
		  justify-content: center;
		  height: 100%;
		}

		#app {
		  color: #2c3e50;
		  margin-top: -100px;
		  max-width: 600px;
		  font-family: Source Sans Pro, Helvetica, sans-serif;
		  text-align: center;
		}
        span{
            font-size: 8px;
        }
		#app a {
		  color: #42b983;
		  text-decoration: none;
		}

		.logo {
		  width: 100px;
		  height: 100px
		}
        .lxm .logo {
		  width: 100px;
		  height: 100px
		}
        .lxm {
		  width: 100px;
		  height: 100px
		}
</style>
