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
          <p v-for="ca in co_authors">
            Name: <a><b>{{ca.name}}</b></a><br>
            Similarity: {{ca.similarity}}<br>
            Number: {{ca.num}}<br>
            <br>
          </p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";
  import PageSelector from "./PageSelector";
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
        //http_data: [],
      }
    },
    computed: {
      // split_authors: function () {
      //   return this.co_authors[0].split(',').map(s => s.trim());
      // }
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
          //console.log(this.co_authors);
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
            this.title = "Sorry, we can't find this author right now";
          }

          // this.$forceUpdate();
        })
      }
    }

  }
</script>
