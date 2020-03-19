<template>
  <div class="main_body">
    <input class='search' v-model="new_query" placeholder="What do you want to know?">
    <button class="buttons" type="button" v-on:click="newSearch">Search!</button>
    <br><br>
    <table style="width: 100%; text-align: left">
      <tr>
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <p>当前时间范围：{{timespans}}</p>

          <input type="date" id="date1" /><br>
          <input type="date" id="date2"/><br>
          <button type="button" v-on:click="selectTime">选择</button><br><br>

          <b style="font-size: 17px; line-height: 25px">选择时间范围：</b><br>
          <a :href="'#/result/' + query + '/' + t.en" style="font-size: 15px; line-height: 25px" v-for="t in times"
          v-on:click="updateTime(t.en)">
            {{t.ch}}<br>
          </a>
        </td>

        <td v-if="isPaper" style="width: 60%; text-align: left; padding-top: 0">
            <ResultEntry v-for="paper in papers" v-bind:is-paper="isPaper" v-bind:key="paper.title" v-bind:title="paper.title"
                         time="xxxx-xx-xx" author="somebody et.al" v-bind:abstract="paper.abstract">
              This is a paper
            </ResultEntry>

        </td>
        <td v-else style="width: 60%; text-align: left; padding-top: 0">
          <ResultEntry v-for="people in results" v-bind:key="people.name" v-bind:name="people.name"
                       v-bind:research_field="people.researchFields" >
            This is a person
          </ResultEntry>
        </td>

        <td style="width: 20%; margin-left: 20px">
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
  const Papers = [{title: 'Attention is all you need', abstract: 'The dominant sequence transduction models are based on complex recurrent orconvolutional neural networks in an encoder and decoder configuration. The best performing such models also connect the encoder and decoder through an attentionm echanisms. We propose a novel, simple network architecture based solely onan attention mechanism, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superiorin quality while being more parallelizable and requiring significantly less timeto train. Our single model with 165 million parameters, achieves 27.5 BLEU onEnglish-to-German translation, improving over the existing best ensemble result by over 1 BLEU. On English-to-French translation, we outperform the previoussingle state-of-the-art with model by 0.7 BLEU, achieving a BLEU score of 41.1.'.substr(0, 100)},
    {title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", abstract: 'We introduce a new language representation model called BERT, which stands for' +
        'Bidirectional Encoder Representations from Transformers. Unlike recent language' +
        'representation models, BERT is designed to pre-train deep bidirectional representations …',},
    {title: "Improving Language Understanding by Generative Pre-Training", abstract: "This paper presents GPT"}
  ];
  const Times = [{ch: "全部时间", en: "all-time"}, {ch: "最近一年", en: "last-year"},
    {ch: "最近半年", en: "last-half-year"}, {ch: "最近一月", en: "last-month"}, {ch: "最近一周", en: "last-week"}];
  const max_query_length = 36;

  export default {
    name: 'Result',
    components: {ResultEntry},
    //props: ['results'],
    data: function () {
      return {
        query: this.$route.params.query,
        results: [],
        times: Times,
        new_query: this.$route.params.query,
        papers: Papers,
        timespans: this.$route.params.timespan,
        isPaper: false,

      }
    },
    methods: {
      newSearch: function () {
        if (this.new_query === "")
          alert("you have entered nothing!");
        else {
          if (this.new_query.length >= max_query_length)
            this.new_query = this.new_query.substr(0, max_query_length);   // truncate overly long queries
          this.$router.push('/result/' + this.new_query + '/' + this.timespans);
          this.$axios.get('http://127.0.0.1:8080/query?name=' + this.new_query)
            .then(response => (this.results = [response.data]))
        }
      },
      updateTime: function (en_time) {
        this.timespans = en_time;
      },
      selectTime: function () {
        let date1 = document.getElementById("date1").value;
        let date2 = document.getElementById("date2").value;
        date1 = date1.slice(0, 4) + date1.slice(5, 7) + date1.slice(8, 10);
        date2 = date2.slice(0, 4) + date2.slice(5, 7) + date2.slice(8, 10);
        console.log(date1);
        console.log(date2);
        if (date1 !== "" && date2 !== "" && date1 < date2)
        {
          this.timespans = date1 + '-' + date2;
          this.$router.push("./" + date1 + '-' + date2);
        }
        else
          alert("Invalid date input!");

      }
    },
    mounted() {
      this.$axios
        .get('http://127.0.0.1:8080/query?name=' + this.query)
        .then(response => (this.results = [response.data]))
        .catch(error => (console.log(error)))
    }
  }
</script>
