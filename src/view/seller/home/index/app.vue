<template>
    <div id="demo">
        <h1>Hello App!</h1>
        <p>
            <!-- 使用指令 v-link 进行导航。 -->
            <a v-link="{ path: '/foo' }">组件Foo</a>
            <a v-link="{ path: '/bar' }">组件Bar</a>
            <a v-link="{ path: '/maopao' }">冒泡可视化</a>
            <a v-link="{ path: '/select' }">自定义指令</a>
        </p>
        <div v-bind:class="['aa classA', isB ? 'classB' : '']">123</div>
        <div class="classA {{isB ? 'classB' : ''}}">123</div>
        <!-- 路由外链 -->
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                isB: true
            }
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