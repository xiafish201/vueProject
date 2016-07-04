<template>
    <list :listcom='list'>123</list>
	<!--<Demo :hello='hello' :prop-b='propB'></Demo>-->
	<img class="logo" :src='imgl'>
	<img v-if=' type == 1' class="logo" :src="imgsrc">
	<img class="logo" src="./assets/img/bg.png">
	<img class="logo" src="../../../../static/img/bg.png">
	<span class='mui-content'>123</span>
</template>

<script>
	// 引入需要使用的组件
	import Demo from '../bizcomponent/Demo'
	import Hello from 'component/Hello'
	import sel from 'view/buyer/home/bizcomponent/SeeSort'
	import list from '../../home/bizcomponent/ListVue'
//	import imgl = require('../../../static/img/bg.png')
	var imgl = './assets/img/bg.png'
	var type = 1
	export default {
		data (){
			return {
				type:0,
				imgl:require(type==1?'./assets/img/logo.png':'./assets/img/bg.png'),
				imgsrc:require('./assets/img/bg.png'),
				hello: 'upup',
				propB: 'lxm'
//				,list: './directiveSelect.vue'
                ,list: sel
			}
		},
		// 注册组件
		components: {
//				Demo,
				list
		},
		methods:{
			cli: function() {
				this.test('12')
				this.type=this.type==1?0:1
			},
			test: function(e) {
				alert(e)
			}
		}
	}
</script>

<style>
    @import '../../../../static/css/iconfont.css';
    
</style>