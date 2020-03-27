<template>
  <div id="app" >
    <img src="./assets/new_logo.png" width="30%" style="margin-top: 20px">
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
  background-color: antiquewhite;
  height: 100%;
}
.head {
  background-color: antiquewhite;
}
.main_body {
  background: linear-gradient(antiquewhite, white);
  height: 140%;
}
</style>
