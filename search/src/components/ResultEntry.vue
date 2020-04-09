<template>
  <div v-if='isPaper' style="padding: 10px">
    <b style="font-size: 18px"><a :href="'#/detail/' + title" >{{title}}</a></b><br>
    <div style="color: grey">
      <b>Time</b>: {{time}} &nbsp
      <b>Field</b>: <a v-for="f in field">{{f}}; &nbsp</a><br>
      <b>Author</b>: <span v-for="aut in author"><a v-on:click="click_author(aut)" :href="'#/detail/' + aut">{{aut}}</a>&nbsp &nbsp </span>
    </div>
  </div>

  <div v-else style="padding: 10px">
    <b style="font-size: 18px"><a :href="'#/detail/' + name" >{{name}}</a></b><br>
    <div style="color: grey">Research fields: <b v-for="f in research_field" v-bind:key="f">{{f}}; &nbsp</b></div>
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
        console.log("click author " + aut);
        this.$emit('change_author', aut);
      }
    }
  }
</script>
