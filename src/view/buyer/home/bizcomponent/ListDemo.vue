<template>
    <div id="listdemo">
    <h1>Hello App!</h1>
    <!-- 路由外链 123-->
//  <router-view></router-view>
    </div>
</template>

<script>
    import VueRouter from 'vue-router'
    import Vue from 'vue'
    
    // Router
    Vue.use(VueRouter)
    // 定义组件
    var Foo = Vue.extend({
        template: '<p>This is foo!</p>'
    })
    var Bar = Vue.extend({
        template: '<p>This is bar!</p>'
    })
    // 创建一个路由器实例
    // 创建实例时可以传入配置参数进行定制，为保持简单，这里使用默认配置
    var router = new VueRouter()
    // 定义路由规则
    // 每条路由规则应该映射到一个组件。这里的“组件”可以是一个使用 Vue.extend
    // 创建的组件构造函数，也可以是一个组件选项对象。
    // 稍后我们会讲解嵌套路由
    router.map({
        '/foo': {
            component: Foo
        },
        '/bar': {
            component: Bar
        }
    });
    
    router.start(Bar, '#app')
    export default {
        props: {
            listcom: { //动态组件
                type: String,
                default: 'component/Counts'
            }
        },
        ready: function(){
            console.log('ready go11111'+this);
            this.$router.map({
              '/hh': {
                component: function (resolve) {
                  require(['component/Counts'], resolve)
                }
              }
            });
            this.$router.go('/hh');
        }
        
    }
</script>
