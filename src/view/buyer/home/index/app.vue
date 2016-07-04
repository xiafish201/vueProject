<template>
    <div id="demo">
        
        <list>123</list>
        <h1>Hello dddd App!</h1>
        <p>
            <!-- 使用指令 v-link 进行导航。 -->
            <a v-link="{ path: '/foo' }">组件Foo</a>
            <a v-link="{ path: '/bar' }">组件Bar</a>
            <a v-link="{ path: '/maopao' }">冒泡可视化</a>
            <a v-link="{ path: '/select' }">自定义指令</a>
            <a v-link="{ path: '/listdemo' }">listdemo</a>
        </p>
        <div v-bind:class="['aa classA', isB ? 'classB' : '']">123</div>
        <div class="classA {{isB ? 'classB' : ''}}">123</div>
        <!-- 路由外链 -->
        <router-view :listCom='listCom'></router-view>
    </div>
</template>

<script>
    import list from '../bizcomponent/ListVue'
    export default {
        data: function() {
            return {
                isB: true
            }
        },
        props: {
            listCom: { //动态组件
                type: String,
                default: '../../../../component/Hello'
            }
        },
        ready: function(){
            console.log('ready goapp.vew'+this.listCom);
            this.$router.map({
              '/async': {
                component: function (resolve) {
                  require(['component/Counters'], resolve)
                }
              }
            });
            this.$router.go('/async');
        },
        components:{
            list
        }
    }
</script>

<style>
    .classA {
        color: #007AFF;
    }
    
    .classB {
        font-size: 40px;
    }
    
    select2 {
        min-width: 300px;
    }
</style>