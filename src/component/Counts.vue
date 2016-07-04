<template>
<div>
    <p>counts</p>
    <Display></Display>
    <Increment></Increment>
    <sort-tab></sort-tab>
</div>

</template>

<script>
import Display from './Display.vue'
import Increment from './Increment.vue'
import store from '../store/store' // import 我们刚刚创建的 store
import SortTab from './SortTab'

export default {
  components: {
    Display,
    Increment,
    SortTab
  },
  store
}

</script>
