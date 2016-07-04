<template>
    <div id="el">
        <p>Selected: {{selected}}</p>
        <select v-select="selected" :options="options">
	    <option value="0">default</option>
	  </select>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selected: 0,
                options: [{
                    id: 1,
                    text: 'hello'
                }, {
                    id: 2,
                    text: 'what'
                }]
            }
        }
    }
</script>

<style>
    .select2 {
        min-width: 300px;
    }
    select {
        min-width: 300px;
    }
</style>