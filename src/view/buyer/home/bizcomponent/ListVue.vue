<template>
    <div>
    <p id='list'>listVue123</p>
    <Hello>hello</Hello>
    <list :test='aaa'>
        <Hello>hello</Hello>
    </list>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Hello from 'component/Hello'
    var reloadCom = function (path) {
      // path.props.test = 'hello'
      Vue.component('list', /* require(path)*/path)
      // path.props.test = 'hello123'
    }
    export default {
      data () {
        return {
          aaa: 'lxm'
        }
      },
      props: {
        listcom: { // 动态组件
          type: Object,
          default: './SeeSort'
        }
      },
      created: function () {
        reloadCom(this.listcom)
//          Console.log('this.components:' + JSON.stringify(this.$options.components));
      },
      components: {
          Hello
      }
    }

</script>
