<template xmlns="http://www.w3.org/1999/html">
  <div v-if='isPaper' style="padding: 10px; border: 1px">
    <b style="font-size: 18px"><a :href="'#/paper/' + title" >{{title}}</a></b><br>
    <div>
      <b>Time</b>: {{time}} &nbsp
      <b>Field</b>: <a v-for="f in field">{{f}}; &nbsp</a><br>
      <b>Author</b>:
      <span v-for="aut in author"><el-tag v-on:click="click_author(aut)" :href="'#/detail/' + aut" style="cursor: pointer">
        {{aut}}</el-tag>&nbsp
      </span>
    </div>
  </div>

  <div v-else style="padding: 10px">
    <b style="font-size: 18px"><a :href="'#/detail/' + name" >{{name}}</a></b><br>
    <div><b>Research fields</b>:
      <span v-for="f in research_field" :key="f"><el-tag style="cursor: pointer">{{f}}</el-tag>&nbsp</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ResultEntry',
    props: ['isPaper', 'abstract', 'title', 'time', 'author', 'name', 'research_field', 'co_authors', 'field'],

    data: function () {
      return {
       // title: "",
       // abstract: ""
      }
    },
    methods: {
      toDetail: function () { // this function is currently of no effect
        //this.$router.push('../detail/' + this.title);
      },
      click_author: function (aut) {
        //this.$router.push("")
        console.log("click author " + aut);
        this.$emit('change_author', aut);
      }
    }
  }
</script>
