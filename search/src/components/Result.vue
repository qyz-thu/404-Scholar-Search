<template>
  <div class="main_body" style=" height: 150%">
    <el-input class='search' style="width: 40%; margin-top: 10px;  line-height: 30px; border-radius: 5px"
              v-model="new_query" placeholder="What do you want to know?"></el-input>
    <el-button type="primary" style="font-size: 15px" icon="el-icon-search" v-on:click="newSearch">Search!</el-button>
    <p>
      <el-radio style="zoom: 120%" v-model="search_type" label="author">Search for scholars</el-radio>
      <el-radio style="zoom: 120%" v-model="search_type" label="paper">Search for papers</el-radio>
    </p>
    <el-divider></el-divider>
    <table style="width: 100%;text-align: left;color: #606266">
      <tr style="vertical-align: top">
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <div v-if="searching_paper">
            <p>当前时间范围：<span style="color: deepskyblue">{{timespans}}</span></p>
            <span style="font-size: 17px; line-height: 25px">选择时间范围：</span><br>
            <p><el-date-picker type="year" v-model="start_year" style="width: 80%" value-format="yyyy" placeholder="start-year">
            </el-date-picker><br></p>
            <p><el-date-picker type="year" v-model="end_year" style="width: 80%" value-format="yyyy" placeholder="end-year">
            </el-date-picker></p>
            <el-button type="primary" v-on:click="selectTime" size="small">选择</el-button>
          </div>
          <div v-else>
            <p><el-select v-model="selected_field" clearable placeholder="choose a field">
              <el-option v-for="field in fields" :key="field.value" :label="field.label" :value="field.value"></el-option>
            </el-select></p>
            <el-button type="primary" v-on:click="select_field" size="small">选择</el-button>
          </div>

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
          <PageSelector @search_field='search_field' v-bind:entries="results" v-bind:is-paper="false"></PageSelector>
        </td>

        <td style="width: 20%; margin-left: 20px">
          Space for JOJO references<br>
          <img src="../assets/CVPR.jpg" width="80%" style="margin-top: 20px; margin-left: 20px">
        </td>
      </tr>

    </table>
  </div>
</template>


<script>
  import ResultEntry from "./ResultEntry";
  import PageSelector from "./PageSelector";
  import { axiosInstance } from '../axios_config.js'

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
        selected_field: '',
        fields: [{value: 'deep learning', label: 'deep learning'},
          {value: 'data mining', label: 'data mining'},
          {value: 'machine learning', label: 'machine learning'}],
      }
    },
    computed: {
      no_results: function () {
        return this.results.length === 0;
      },
      key_word: function () {
        return this.$route.params.query;
      },
      searching_paper: function () {
        return this.search_type === 'paper';
      }
    },
    methods: {
      newSearch: function () {
        console.log("search for " + this.search_type);
        if (this.new_query === "")
          alert("you have entered nothing!");
        else {
          if (this.new_query.length >= max_query_length)
            this.new_query = this.new_query.substr(0, max_query_length);   // truncate overly long queries
          let q = this.$route.params.query;
          let t = this.$route.params.type;
          let s = this.$route.params.timespan;
          if (this.new_query !== q || this.search_type !== t || this.timespans !== s)
          {
            this.$router.push('/result/' + this.new_query + '/' + this.search_type  + '/' + this.timespans);
            this.$router.go(0);
          }

        }
      },
      selectTime: function () {
        console.log(this.start_year);
        console.log(this.end_year);
        let date1 = this.start_year;
        let date2 = this.end_year;
        if (date1 !== "" && date2 !== "" && date1 < date2)
        {
          this.timespans = date1 + '-' + date2;
          if (this.timespans !== this.$route.params.timespan)
          {
            this.$router.push("./" + date1 + '-' + date2);
            axiosInstance({ url: '/backend_search?keyword=' + this.query+ '&keytype=paper&inf=' + date1 + '&sup=' +date2 })
              .then(response => {
                this.results = response.data.result;
                this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
              })
          }
        }
        else
          alert("Invalid date input!");

      },
      update: function (aut) {
        this.$router.push('../../../detail/' + aut);
      },
      search_field: function (field) {
        console.log("search field " + field);
        this.$router.push('/result/' + field + '/author_field' + '/' + this.timespans);
        this.results = [];
        this.no_result_warning = "Searching...";
        this.new_query=field;
        // this.$axios.get('http://123.57.231.102:8080/search?keyword=' + field + '&keytype=' + 'author_field')
        axiosInstance({ url: '/backend_search?keyword=' + field+ '&keytype=author_field' })
          .then(response => {
            this.results = response.data.result;
            this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
          })
      },
      select_field: function () {
        // console.log(this.selected_field);
        if (this.select_field === '')
          return ;
        axiosInstance({ url: '/backend_search?keyword=' + this.query+ '&keytype=author_adv&fields='+this.selected_field })
          .then(response => {
            this.results = response.data.result;
            this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
          });
        this.$forceUpdate();
      }
    },
    mounted() {
      console.log(this.search_type);
      this.no_result_warning = "Searching...";
      //let key_type = this.isPaper? 'paper': 'author';
      var key_type = 'author';
      if (this.search_type === 'paper')
        key_type = 'paper';
      else if (this.search_type === 'author')
        key_type = 'author';
      else if (this.search_type === 'author_field')
        key_type = 'author_field';
      this.isPaper = key_type === 'paper';
      // this.$axios
        // .get('http://123.57.231.102:8080/search?keyword=' + this.query + '&keytype=' + key_type)
      axiosInstance({ url: '/backend_search?keyword=' + this.query + '&keytype=' + key_type })
        .then(response => {
          this.results = response.data.result;
          console.log(this.results);
          this.no_result_warning = "Sorry, we found no result matching " + this.key_word;
          if(key_type === 'author'){
            this.fields=[];
            for(var i=0;i<response.data.fields.length;i++){
              this.fields.push({value: response.data.fields[i], label: response.data.fields[i]})
            }
          }
          console.log(this.fields)
        })
        .catch(error => (console.log(error)));
    }
  }
</script>
<style type="text/css">
  .search {width: 40%; margin-top: 10px;  line-height: 30px; border-radius: 5px}
</style>
