<template>
  <div class="main_body" style=" height: 150%">
    <el-input class='search' v-model="new_query" placeholder="What do you want to know?"></el-input>
    <el-button type="primary" style="font-size: 15px" icon="el-icon-search" v-on:click="newSearch">Search!</el-button>
    <p>
      <el-radio style="zoom: 120%" v-model="search_type" label="scholar">Search for scholars</el-radio>
      <el-radio style="zoom: 120%" v-model="search_type" label="paper">Search for papers</el-radio>
    </p>
    <el-divider></el-divider>
    <table style="width: 100%;text-align: left;color: #606266">
      <tr style="vertical-align: top">
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <p>当前时间范围：<span style="color: deepskyblue">{{timespans}}</span></p>
          <span style="font-size: 17px; line-height: 25px">选择时间范围：</span><br>
          <p><el-date-picker type="year" v-model="start_year" style="width: 80%" value-format="yyyy" placeholder="start-year">
          </el-date-picker><br></p>
          <p><el-date-picker type="year" v-model="end_year" style="width: 80%" value-format="yyyy" placeholder="end-year">
          </el-date-picker></p>
          <el-button type="primary" v-on:click="selectTime" size="small">选择</el-button>
        </td>

        <td v-if="isPaper" style="width: 60%; text-align: left; padding-top: 0">
          <div v-if="no_results" style="font-size: 25px">
            <b >{{no_result_warning}}</b>
          </div>
          <PageSelector @update='update' v-bind:entries="results" v-bind:is-paper="true"></PageSelector>
        </td>

        <td v-else style="width: 60%; text-align: left; padding-top: 0">
          <div v-if="no_results" style="font-size: 22px">
            <br> <br>
            <b>{{no_result_warning}}</b>
          </div>
          <PageSelector v-bind:entries="results" v-bind:is-paper="false"></PageSelector>
        </td>

        <td style="width: 20%; margin-left: 20px">
          Space for JOJO references<br>
          <img src="../assets/jojo.jpg" width="80%" style="margin-top: 20px">
        </td>
      </tr>

    </table>
  </div>
</template>


<script>
  import ResultEntry from "./ResultEntry";
  import PageSelector from "./PageSelector";

  const Times = [{ch: "全部时间", en: "all-time"}, {ch: "最近一年", en: "last-year"},
    {ch: "最近半年", en: "last-half-year"}, {ch: "最近一月", en: "last-month"}, {ch: "最近一周", en: "last-week"}];
  const max_query_length = 60;

  export default {
    name: 'Result',
    components: {PageSelector, ResultEntry},
    //props: ['results'],
    data: function () {
      return {
        query: this.$route.params.query,
        results: [],
        times: Times,
        new_query: this.$route.params.query,
        timespans: this.$route.params.timespan,
        isPaper: false,
        no_result_warning: "Sorry, we found no result matching " +this.$route.params.query,
        search_type: this.$route.params.type,
        start_year: '',
        end_year: '',
      }
    },
    computed: {
      no_results: function () {
        return this.results.length === 0;
      },
      key_word: function () {
        return this.$route.params.query;
      }
    },
    methods: {
      newSearch: function () {
        console.log("search for " + this.search_type);
        if (this.new_query === "")
          alert("you have entered nothing!");
        else {
          this.isPaper = this.search_type === "paper";
          let key_type = this.isPaper? 'paper': 'author';
          if (this.new_query.length >= max_query_length)
            this.new_query = this.new_query.substr(0, max_query_length);   // truncate overly long queries
          this.$router.push('/result/' + this.new_query + '/' + this.search_type  + '/' + this.timespans);
          this.no_result_warning = "Searching...";
          this.$axios.get('http://123.57.231.102:8080/search?keyword=' + this.new_query + '&keytype=' + key_type)
            .then(response => {
              this.results = response.data.result;
              this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
            })
        }
      },
      updateTime: function (en_time) {
        this.timespans = en_time;
      },
      selectTime: function () {
        console.log(this.start_year);
        console.log(this.end_year);
        let date1 = this.start_year;
        let date2 = this.end_year;
        if (date1 !== "" && date2 !== "" && date1 < date2)
        {
          this.timespans = date1 + '-' + date2;
          this.$router.push("./" + date1 + '-' + date2);
        }
        else
          alert("Invalid date input!");

      },
      update: function (aut) {
        // console.log("switch to author: " + aut);
        // this.search_type = 'scholar';
        // this.isPaper = false;
        // this.$router.push('/result/' + aut + '/author/' + this.timespans);
        // this.no_result_warning = "Searching...";
        // this.$axios.get('http://123.57.231.102:8080/search?keytype=author&keyword=' + aut)
        //   .then(response => {
        //     this.results = response.data.result;
        //     this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
        //   })
        this.$router.push('../../../detail/' + aut);
      }
    },
    mounted() {
      console.log(this.search_type);
      this.isPaper = this.search_type === "paper";
      this.no_result_warning = "Searching...";
      let key_type = this.isPaper? 'paper': 'author';
      this.$axios
        .get('http://123.57.231.102:8080/search?keyword=' + this.query + '&keytype=' + key_type)
        .then(response => {
          this.results = response.data.result;
          console.log(this.results);
          this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
        })
        .catch(error => (console.log(error)));


    }
  }
</script>
