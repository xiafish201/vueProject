import Vue from 'vue'
import app from './app'
/* eslint-disable no-new */
//new Vue({
//el: '#app',
//components: {
//  app
//}
//})


//配置路由
    import VueRouter from 'vue-router'
    
    import maopao from '../bizcomponent/SeeSort'
    import select from '../bizcomponent/directiveSelect'
    import selectDt from 'directive/selectDt'
    
    import DateFilter from 'filter/dataFilte.js'
    
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
        '/': {
            component: select
        },
        '/foo': {
            component: Foo
        },
        '/bar': {
            component: Bar
        },
        '/maopao': {
            component: maopao
        },
        '/select': {
            component: select
        }
    })
    
    // Filters
    Vue.filter('dataFilter', DateFilter.dateFilter)
    //directive
    Vue.directive('select', selectDt)
    // 现在我们可以启动应用了！
    // 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
    router.start(Vue.extend(app), '#app')
