<template>
  <h1>冒泡排序算法视觉化</h1>
  <div>
      <div class="value-line" style="width:{{i*10}}px;" v-for="i in data" >{{i}}</div>
      <button @click="start()">排序</button>
      <button @click="reData()">重置</button>
      <span style="color:red">{{alertMsg}}</span>

  </div>

</template>

<script>
  var data = [37, 28, 29, 24, 21, 11, 5, 10, 4, 3, 8, 1, 25, 12, 20, 30]
  var i = 0
  var checkLen = 0
  export default {
    data () {
      return {
        data: data,
        backupData: data.map(function (i) { return i }),
        alertMsg: ''
      }
    },
    methods: {
      start: function () {
        console.log(this.data)
        checkLen = this.data.length
        setTimeout(this.sorting, 100)
      },
      reData: function () {
        this.data = this.backupData
        i = 0
        this.alertMsg = ''
      },
      sorting: function () {
        if (this.data[i + 1] > this.data[i]) {
          var tmp = this.data[i]
          this.data.$set(i, this.data[i + 1])
          this.data.$set(i + 1, tmp)
        }
        i++
        if (i >= checkLen) {
          i = 0
          checkLen--
        }
        if (checkLen <= 0) {
          this.alertMsg = '排序结束'
        } else {
          setTimeout(this.sorting, 100)
        }
      }
    }
  }

</script>

<style>
.value-line{
  margin-bottom:1px;
  background:green;
  color:white;

  }

</style>
