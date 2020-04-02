<template>
  <div class="main_body">
    <p style="font-size: 28px">{{title}}</p><br>
    <table style="width: 100%; text-align: left; ">
      <tr style="vertical-align: top">
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <p style="font-size: 20px">Research Fields:</p>
          <p v-for="field in research_fields"><b>{{field}}</b></p>
        </td>

        <td style="width: 50%; text-align: left; padding-top: 0">
          <PageSelector @update='update' v-bind:entries="papers" v-bind:is-paper="true">
          </PageSelector>
        </td>

        <td style="width: 30%; margin-left: 20px">
          <p style="font-size: 20px">Co-authors:</p>
          <div v-if="has_coauthor">
            <p v-for="ca in co_authors">
              Name: <a><b>{{ca.name}}</b></a><br>
              Similarity: {{ca.similarity}}<br>
              Number: {{ca.num}}<br>
              <br>
            </p>
          </div>
          <div v-else>
            Sorry, we don't have co-authors of <b>{{current_author}}</b> in our database now.
          </div>

        </td>
      </tr>
    </table>

    <input class='search' v-model="new_query" placeholder="Who else do you want to know?">
    <button class="buttons" type="button" v-on:click="newSearch">Search!</button>
  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";
  import PageSelector from "./PageSelector";
  const max_query_length = 60;

  export default {
    name: 'Detail',
    components: {PageSelector, ResultEntry},
    data: function () {
      return {
        isPaper: false,
        title: this.$route.params.title,
        co_authors: [","],
        research_fields: [],
        papers: [],
        new_query: "",
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
            if (this.co_authors.length > 3)
              this.co_authors = this.co_authors.slice(0, 3);
            this.research_fields = response.data.result.researchFields;
            if (this.research_fields.length > 3)
              this.research_fields = this.research_fields.slice(0, 3);
            this.papers = response.data.result.papers;
          }
          console.log(this.co_authors);
          //console.log(this.research_fields);
          //console.log(this.papers);
        })
        .catch(error =>(console.log(error)));
    },
    mounted() {
    },
    methods: {
      update: function (aut) {
        console.log("update author to " + aut);
        this.$axios
        .get("http://123.57.231.102:8080/query?name=" + aut)
        .then(response => {
          console.log(response.data);
          if (response.data.status === "success")
          {
            this.co_authors = response.data.result.co_authors;
            if (this.co_authors.length > 3)
              this.co_authors = this.co_authors.slice(0, 3);
            this.research_fields = response.data.result.researchFields;
            if (this.research_fields.length > 3)
              this.research_fields = this.research_fields.slice(0, 3);
            this.papers = response.data.result.papers;
            this.title = aut;
          }
          else {
            this.co_authors = [];
            this.research_fields = [];
            this.papers = [];
            this.title = "Sorry, we don't have this author in our database now";
          }

          // this.$forceUpdate();
        })
      },
      newSearch: function () {
        console.log("make new search");
        if (this.new_query === "")
        alert("you have entered nothing!");
      else {
          if (this.new_query.length >= max_query_length)
            this.new_query = this.new_query.substr(0, max_query_length);   // truncate overly long queries
          this.$router.push('/result/' + this.new_query + '/' + this.timespans);
          this.$axios.get('http://123.57.231.102:8080/search?keyword=' + this.new_query + '&keytype=author')
            .then(response => {
              this.results = response.data.result;
            })
        }
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
