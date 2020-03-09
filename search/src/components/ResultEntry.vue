<template>
  <div style="padding: 10px">
      <b><a href="#" v-on:click="toDetail">{{title}}</a></b><br>
    <div style="color: grey"><b>Time</b>: {{time}} &nbsp <b>Author</b>: {{author}}<br>
      </div>
    <b>Abstract</b>: {{abstract}}
  </div>
</template>

<script>
  export default {
    name: 'ResultEntry',
    props: ['abstract', 'title', 'time', 'author'],
    data: function () {
      return {
       // title: "",
       // abstract: ""
      }
    },
    methods: {
      toDetail: function () {
        this.$router.push('../detail/' + this.title);

      }
    }
  }
</script>
