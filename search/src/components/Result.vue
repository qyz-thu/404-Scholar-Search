<template>
  <div class="main_body">
    <input class='search' v-model="new_query" placeholder="What do you want to know?">
    <button class="buttons" type="button" v-on:click="newSearch">Search!</button>
    <br><br>
    <table style="width: 100%; text-align: left">
      <tr>
        <td style="width: 20%; text-align: left; padding-left: 30px">
          <b>选择时间范围：</b>
          <p v-for="t in times">
            {{t}}<br>
          </p>
        </td>
        <td style="width: 60%; text-align: left; padding-top: 0">
            <ResultEntry v-for="res in results" v-bind:title="res" abstract="some abstract"></ResultEntry>
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
  import ResultEntry from "./ResultEntry";
  const Results = ["Attention is all you need", "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
  "Improving Language Understanding by Generative Pre-Training"];
  const Times = ["全部时间", "最近一年", "最近半年", "最近一月"];
  const max_query_length = 36;

  export default {
    name: 'Result',
    components: {ResultEntry},
    data: function () {
      return {
        query: this.$route.params.query,
        results: Results,
        times: Times,
        new_query: ''
      }
    },
    methods: {
      newSearch: function () {
        if (this.new_query === "")
          alert("you have entered nothing!");
        else {
          if (this.new_query.length >= max_query_length)
            this.new_query = this.new_query.substr(0, max_query_length);   // truncate overly long queries
          this.$router.push('/result/' + this.new_query);
        }
      }
    }
  }
</script>
