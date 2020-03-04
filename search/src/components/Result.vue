<template>
  <div>
    <h1>This is a result page</h1>
    <br><br>
    <p>You have searched for {{query}}</p><br>
    <button type="button" class="buttons" v-on:click="backHome">Return</button>
  </div>
</template>

<script>
  export default {
    name: 'Result',
    data: function() {
      return {
        query: this.$route.params.query
      }
    },
    methods: {
      backHome: function () {
          this.$router.push('../');
      }
    }
  }

</script>
