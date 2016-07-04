<template>
  <div id="lxm">
    <img class="logo" src="../index/assets/img/logo.png">
    <list @click='sayHello'></list>
    <Counterslxm></Counterslxm>
    <span style="color:red">{{alertMsg}}</span>
  </div>
</template>

<script>
// 这里配置了resolve.alias，所以可以使用短路径
import Hello from 'component/Hello'
import Counterslxm from 'component/Counts'
//import list from '../../home/bizcomponent/ListVue'
var count = 0
export default {
	data: function() {
		return {
			alertMsg:''
		}
	},
	props: {
		hello: String,
		list:Object,
		propB: {
      type: String,
      required: true
    }
	},
  components: {
//  list:list,
    Counterslxm
  },
  methods: {
  	sayHello:function() {
  		this.alertMsg = this.propB+':'+this.hello + '===='+count++
  	}
  },
  ready: function(){
//    this.components()
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

		#app a {
		  color: #42b983;
		  text-decoration: none;
		}

		.logo {
		  width: 100px;
		  height: 100px
		}
</style>
