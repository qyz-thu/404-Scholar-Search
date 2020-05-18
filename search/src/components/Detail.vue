<template>
  <div style="background: linear-gradient(#fff0e6, white); height: 200%;">
    <el-divider></el-divider>
    <table style="width: 100%; text-align: left;color: #606266">
      <tr style="vertical-align: top">
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <p style="font-size: 20px">H-index: <b style="color: #303133">{{h_index}}</b></p>
          <p style="font-size: 20px">Research Fields:</p>
          <p v-for="field in research_fields"><el-tag style="cursor: pointer">{{field}}</el-tag></p>
        </td>

        <td style="width: 60%; text-align: left; padding-top: 0">
          <PageSelector @update='update' @highlight="highlight" @dlight="de_highlight" ref="page_selector"
                        v-bind:entries="papers" v-bind:is-paper="true">
          </PageSelector>
        </td>

        <td style="width: 20%; margin-left: 20px">
          <p style="font-size: 20px">Scholars similar to <br><b style="color: #303133">{{current_author}}</b>:</p>
          <div v-if="has_coauthor">
            <p v-for="ca in co_authors" v-bind:style="{color: text_color(ca.highlight)} ">
              <el-tooltip placement="top">
                <div slot="content">Similarity: {{ca.similarity}}<br>
                  Number of Collaboration: {{ca.num}}<br><br>
                  CLICK TO SEE DETAIL</div>
                <el-tag style="cursor: pointer" v-bind:color="text_color(ca.highlight)" @click="update(ca.name)"> {{ca.name}}</el-tag>
              </el-tooltip>
              <br>
            </p>
          </div>
          <div v-else>
            Sorry, we don't have co-authors of <b>{{current_author}}</b> in our database now.
          </div>

        </td>
      </tr>
    </table>
    <br><br>
    <el-input class='search' style="width: 40%; margin-top: 10px;  line-height: 30px; border-radius: 5px"
              v-model="new_query" placeholder="Who else do you want to know?"></el-input>
    <el-button type="primary" style="font-size: 15px" icon="el-icon-search" v-on:click="newSearch">Search!</el-button>
    <p>
      <el-radio style="zoom: 120%" v-model="search_type" label="author">Search for scholars</el-radio>
      <el-radio style="zoom: 120%" v-model="search_type" label="paper">Search for papers</el-radio>
    </p>
  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";
  import PageSelector from "./PageSelector";
  const max_query_length = 60;
  import { axiosInstance } from '../axios_config.js'

  export default {
    name: 'Detail',
    components: {PageSelector, result_entry: ResultEntry},
    data: function () {
      return {
        isPaper: false,
        title: this.$route.params.title,
        co_authors: [","],
        research_fields: [],
        papers: [],
        new_query: "",
        h_index: 0,
        search_type: 'author',
        //http_data: [],
      }
    },
    computed: {
      has_coauthor: function () {
        return this.co_authors.length !== 0;
      },
      current_author: function () {
        return this.$route.params.title;
      },

    },
    beforeMount() {
      // this.$axios
      //   .get("http://123.57.231.102:8080/query?name=" + this.title)
      axiosInstance({ url: '/backend_query?name=' + this.title })
        .then(response =>{
          //this.http_data = response.data;
          console.log(response.data);
          if (response.data.status === "success")
          {
            this.co_authors = response.data.result.co_authors;
            for (var i = 0;i < this.co_authors.length; i++)
              this.co_authors[i]['highlight'] = false;
            this.research_fields = response.data.result.researchFields;
            this.papers = response.data.result.papers;
            this.h_index = response.data.result.H_index;
          }
          else
          {
            this.co_authors = [];
            this.research_fields = [];
            this.papers = [];
            this.title = "Sorry, we don't have this author in our database now";
            this.h_index = 0;
          }
          //console.log(this.co_authors);
          //console.log(this.research_fields);
          //console.log(this.papers);
        })
        .catch(error =>(console.log(error)));
    },
    mounted() {
      if (window.history && window.history.pushState)
      {
        history.pushState(null, null, document.URL);
        window.addEventListener('popstate', this.back,false);
      }
    },
    destroyed() {
      window.removeEventListener('popstate', this.back, false);
    },
    methods: {
      back: function() {
        console.log("you've clicked back.");
        console.log(this.$route.params.title);
        //this.$axios
          //.get("http://123.57.231.102:8080/query?name=" + this.$route.params.title)
        axiosInstance({ url: '/backend_query?name=' + this.$route.params.title })
          .then(response => {
            console.log(response.data);
            if (response.data.status === "success")
            {
              this.co_authors = response.data.result.co_authors;
              for (var i = 0;i < this.co_authors.length; i++)
                this.co_authors[i]['highlight'] = false;
              this.research_fields = response.data.result.researchFields;
              this.papers = response.data.result.papers;
              this.title = this.$route.params.title;
            }
            else {
              this.co_authors = [];
              this.research_fields = [];
              this.papers = [];
              this.title = "Sorry, we don't have this author in our database now";
              this.h_index = 0;
            }
          });

      },
      update: function (aut) {
        console.log("update author to " + aut);
        this.$router.push('/detail/' + aut);
        // this.$axios
        // .get("http://123.57.231.102:8080/query?name=" + aut)
        axiosInstance({ url: '/backend_query?name=' + aut})
          .then(response => {
          console.log(response.data);
          if (response.data.status === "success")
          {
            this.co_authors = response.data.result.co_authors;
            for (var i = 0;i < this.co_authors.length; i++)
              this.co_authors[i]['highlight'] = false;
            this.research_fields = response.data.result.researchFields;
            this.papers = response.data.result.papers;
            this.title = aut;
          }
          else {
            this.co_authors = [];
            this.research_fields = [];
            this.papers = [];
            this.title = "Sorry, we don't have this author in our database now";
            this.h_index = 0;
          }
          this.$refs.page_selector.reset();
        });
      },
      newSearch: function () {
        console.log("make new search");
        if (this.new_query === "")
          alert("you have entered nothing!");
        else {
          if (this.new_query.length >= max_query_length)
            this.new_query = this.new_query.substr(0, max_query_length);   // truncate overly long queries
          this.$router.push('/result/' + this.new_query + '/' + this.search_type + '/all-time');
        }
      },
      highlight: function (authors) {
        for (var i = 0; i < authors.length; i++)
        {
          for (var j = 0; j < this.co_authors.length; j++)
            if (authors[i] === this.co_authors[j].name)
              this.co_authors[j]['highlight']  = true;
        }
        this.$forceUpdate();
      },
      de_highlight: function() {
        for (var i = 0; i < this.co_authors.length; i++)
          this.co_authors[i].highlight = false;
        this.$forceUpdate();
      },
      text_color: function (h) {
        if (h === true)
          return 'yellow';
        return '#ECF5FF';
      }

    }
  }
</script>

<style type="text/css">
  .search {width: 40%; margin-top: 10px;  line-height: 30px; border-radius: 5px}


</style>
