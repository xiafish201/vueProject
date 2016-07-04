<template>
  <div id="lxm">
    <img class="logo" :src="img">
    <hello></hello>
  </div>
</template>

<script>
// 这里配置了resolve.alias，所以可以使用短路径
import Hello from 'component/Hello'

export default {
    data: function() {
        return {
            img:require('static/img/logo.png')
        }
    },
  components: {
    Hello
  },
  ready: function() {
      var searchParams = location.search;
      console.log(searchParams);
      alert(searchParams);
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
