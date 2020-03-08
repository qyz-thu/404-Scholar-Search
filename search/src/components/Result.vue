<template>
  <div class="main_body">
    <h1>This is a result page</h1>
    <br><br>
    <p>You have searched for {{query}}</p><br><br><br>
    <button type="button" class="buttons" v-on:click="backHome">Return</button>
    <table style="width: 100%">
      <tr>
        <td style="width: 20%">
          搜索时间<br>
          时间1<br>
          时间2<br>
        </td>
        <td style="width: 60%">
          结果1<br>
          结果2<br>
          结果3<br>
        </td>
        <td style="width: 20%">
          something else<br>
          lalala
        </td>
      </tr>

    </table>
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
