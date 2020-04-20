<template>
  <div style="background: linear-gradient(antiquewhite, white); height: 200%;">
    <p style="font-size: 32px">{{title}}</p><br>
    <table style="width: 100%; text-align: left; ">
      <tr style="vertical-align: top">
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <p style="font-size: 20px">H-index: <b>{{h_index}}</b></p><br>
          <p style="font-size: 20px">Research Fields:</p>
          <p v-for="field in research_fields"><b>{{field}}</b></p>
        </td>

        <td style="width: 50%; text-align: left; padding-top: 0">
          <PageSelector @update='update' @highlight="highlight" @dlight="de_highlight" ref="page_selector"
                        v-bind:entries="papers" v-bind:is-paper="true">
          </PageSelector>
        </td>

        <td style="width: 30%; margin-left: 20px">
          <p style="font-size: 20px">Scholars similar to <b>{{title}}</b>:</p>
          <div v-if="has_coauthor">
            <p v-for="ca in co_authors" v-bind:style="{color: text_color(ca.highlight)} ">
              Name: <a v-on:click="update(ca.name)" :href="'#/detail/' + ca.name"><b>{{ca.name}}</b></a><br>
              Similarity: {{ca.similarity}}<br>
              Number of Collaboration: {{ca.num}}<br>
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
    <input class='search' v-model="new_query" placeholder="Who else do you want to know?">
    <button class="buttons" type="button" v-on:click="newSearch">Search!</button>
    <p>
      <input style="zoom: 120%" type="radio" id="scholar_box" value="scholar" name="select" v-model="search_type" checked="true">
      <label for="scholar_box" style="font-size: 20px">Search for scholars</label>
      &nbsp &nbsp &nbsp &nbsp &nbsp
      <input style="zoom: 120%" type="radio" id="paper_box" value="paper" name="select" v-model="search_type">
      <label for="paper_box" style="font-size: 20px">Search for papers</label>
    </p>
  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";
  import PageSelector from "./PageSelector";
  const max_query_length = 60;

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
        search_type: 'scholar',
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
      this.$axios
        .get("http://123.57.231.102:8080/query?name=" + this.title)
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
        this.$axios
          .get("http://123.57.231.102:8080/query?name=" + this.$route.params.title)
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
        this.$axios
        .get("http://123.57.231.102:8080/query?name=" + aut)
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
          this.$router.push('/result/' + this.new_query + '/' + this.search_type + '/' + this.timespans);
          this.$axios.get('http://123.57.231.102:8080/search?keyword=' + this.new_query + '&keytype=author')
            .then(response => {
              this.results = response.data.result;
            })
        }
      },
      highlight: function (authors) {
        // console.log("highlight now");
        // console.log(authors);
        // console.log(this.co_authors);
        for (var i = 0; i < authors.length; i++)
        {
          for (var j = 0; j < this.co_authors.length; j++)
            if (authors[i] === this.co_authors[j].name)
              this.co_authors[j]['highlight'] = true;
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
          return 'cyan';
        return 'black';
      }

    }
  }
</script>

<style type="text/css">
  .search {width: 40%; margin-top: 10px;  line-height: 30px; border-radius: 5px}
  .buttons {
    width: 100px;
    height: 35px;
    /*margin-bottom: 150px;*/
    font-size: 16px;
    font-weight: bold;
    color: white;
    border-radius: 6px;
    display: inline-block;
    background-image: linear-gradient(#8ee4ff, #6bcaff);

  }
</style>
