<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import { removeItem } from "./utils";

export default {
  name: 'App',
  components: {},
  beforeDestroy() {
    removeItem('nowPage') // 移出存储的页码
  },
  destroyed() {
    removeItem('nowPage')
  }
}
</script>

<style src="./assets/css/base.css">
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/
</style>
