<template>
  <div id="app" >
    <img src="./assets/new_logo.png" width="25%" style="margin-top: 20px">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  bottom: 0;
  top: 0;
  background-color: #fff0e6;
  height: 100%;
}
.head {
  background-color: #fff0e6;
}
.main_body {
  background: linear-gradient(#fff0e6, white);
  height: 140%;
}
</style>
