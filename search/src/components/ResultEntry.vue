<template>
  <div v-if='isPaper' style="padding: 10px">
    <b style="font-size: 18px"><a :href="'#/detail/' + title" v-on:click="toDetail">{{title}}</a></b><br>
    <div style="color: grey">
      <b>Time</b>: {{time}} &nbsp
      <b>Author</b>: <a v-for="aut in author">{{aut}} </a>
      <br>
    </div>
    <b>Field</b>: <a v-for="f in field">{{f}}</a>
  </div>

  <div v-else style="padding: 10px">
    <b style="font-size: 18px"><a :href="'#/detail/' + name" v-on:click="toDetail">{{name}}</a></b><br>
    <div style="color: grey">Research fields: <b v-for="f in research_field" v-bind:key="f">{{f}}</b></div>
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
      }
    }
  }
</script>
