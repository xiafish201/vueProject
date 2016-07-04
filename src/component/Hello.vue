<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h1>{{ hello }}</h1>
  </div>
  <!-- <div>
      <Display></Display>
      <Increment></Increment>
  </div> -->
</template>

<script>
// import Display from './Display.vue'
// import Increment from './Increment.vue'
// import store from '../vuex/store'

export default {
  // components: {
  //   Display,
  //   Increment
  // },
  // store,

  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello,jxdd!'
    }
  },
  props: {
    hello: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
</style>
