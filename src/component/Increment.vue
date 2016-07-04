<template>

<div>
    Clicked: {{ count }} times
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">奇数+1</button>
    <button @click="incrementAsync">隔1秒+1</button>
</div>

</template>

<script>

import * as actions from '../store/actions'
export default {
    vuex: {
        getters: {
            count: ({
                counter
            }) => counter.count
        },
        actions: actions
    }
}

</script>
