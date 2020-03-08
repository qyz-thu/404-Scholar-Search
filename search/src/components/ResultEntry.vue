<template>
  <div>
    <p><b><a v-on:click="toDetail">{{title}}</a></b><br>  Abstract: {{abstract}} </p>
  </div>
</template>

<script>
  export default {
    name: 'ResultEntry',
    props: ['abstract', 'title'],
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
