<template xmlns="http://www.w3.org/1999/html">
  <div v-if='isPaper' style="padding: 10px; border: 1px; height: 100px; background-color: white">
    <b style="font-size: 18px"><a :href="'#/paper/' + title" >{{title}}</a></b><br>
    <div>
      <b>Time</b>: {{time}} &nbsp <br>
      <b>Author</b>:
      <span v-for="aut in author"><el-tag v-on:click="click_author(aut)" :href="'#/detail/' + aut" style="cursor: pointer">
        {{aut}}</el-tag>&nbsp
      </span>
    </div>
  </div>

  <div v-else style="padding: 10px; border: 1px; height: 150px; background-color: white">
    <b style="font-size: 18px"><a :href="'#/detail/' + name" >{{name}}</a></b><br>
    <b style="font-size: 14px">H-index: <span style="color: #6bcaff">{{hindex}}</span>&nbsp |
      Publish: <span style="color: #6bcaff">{{publish}}</span>&nbsp |
      Citation: <span style="color: #6bcaff">{{citation}}</span></b>
    <div><b style="font-size: 14px">Research fields</b>:
      <span v-for="f in research_field" :key="f"><el-tag v-on:click="click_field(f)" style="cursor: pointer">{{f}}</el-tag>&nbsp</span>
    </div>
  </div>
  <el-divider></el-divider>

</template>

<script>
  export default {
    name: 'ResultEntry',
    props: ['isPaper', 'abstract', 'title', 'time', 'author', 'name', 'research_field',
      'co_authors', 'field', 'hindex', 'publish', 'citation'],

    data: function () {
      return {

      }
    },
    methods: {
      toDetail: function () { // this function is currently of no effect
        //this.$router.push('../detail/' + this.title);
      },
      click_author: function (aut) {
        this.$emit('change_author', aut);
      },
      click_field: function (field) {
        console.log("click field " + field);
        this.$emit('click_field', field);
      }
    }
  }
</script>
