<template>
  <div>
    <p><b>{{title}}</b><br>  Abstract: {{abstract}} </p>
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
    }
  }
</script>
