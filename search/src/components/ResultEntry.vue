<template>
  <div v-if='isPaper' style="padding: 10px">
      <b style="font-size: 18px"><a :href="'#/detail/' + title" v-on:click="toDetail">{{title}}</a></b><br>
      <div style="color: grey"><b>Time</b>: {{time}} &nbsp <b>Author</b>: {{author}}<br>
      </div>
    <b>Abstract</b>: {{abstract}}
  </div>
  <div v-else style="padding: 10px">
    <b style="font-size: 18px"><a :href="'#/detail/' + name" v-on:click="toDetail">{{name}}</a></b><br>
    This should show a people
  </div>
</template>

<script>
  export default {
    name: 'ResultEntry',
    props: ['isPaper', 'abstract', 'title', 'time', 'author', 'name', 'research_field',],
    // props: {
    //   isPaper: Boolean,
    //   abstract: String,
    //   title: String,
    //   time: String,
    //   author: String,
    //   name: String,
    //   research_fields: ,
    //
    // }
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
