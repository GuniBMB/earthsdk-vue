<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <a-map></a-map>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AMap from "@/views/map/AMap";
export default {
  name: 'app',
  components: {
    AMap
  }
}
</script>

<style>
    html,body{
        list-style: none;
        /*box-sizing: border-box;*/
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        /*margin-top: 60px;*/
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
