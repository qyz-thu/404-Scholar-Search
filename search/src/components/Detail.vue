<template>
  <div>
    <p style="font-size: 25px">{{title}}</p><br>
    <table style="width: 100%; text-align: left">
      <tr>
        <td style="width: 20%; text-align: center; padding-right: 30px">
          <p><b>Research Fields:</b></p>
          <p v-for="field in research_fields">{{field}}</p>
        </td>

        <td style="width: 60%; text-align: left; padding-top: 0">
          <ResultEntry v-for="paper in papers" v-bind:key="paper.title"
            :is-paper="true" v-bind:title="paper.title" v-bind:field="paper.fields"
          v-bind:time="paper.time" v-bind:author="paper.authors">
          </ResultEntry>
        </td>

        <td style="width: 20%; margin-left: 20px">
          <p><b>Co-authors:</b></p>
          <p v-for="ca in split_authors">{{ca}}</p>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";
  export default {
    name: 'Detail',
    components: {ResultEntry},
    data: function () {
      return {
        isPaper: false,
        title: this.$route.params.title,
        co_authors: [","],
        research_fields: [],
        papers: [],
        http_data: [],
      }
    },
    computed: {
      split_authors: function () {
        return this.co_authors[0].split(',').map(s => s.trim());
      }
    },
    beforeMount() {
      this.$axios
        .get("http://127.0.0.1:8080/query?name=" + this.title)
        .then(response =>{
          this.http_data = response.data;
          this.co_authors = response.data.result.co_authors;
          this.research_fields = response.data.result.researchFields;
          this.papers = response.data.result.papers;
          console.log(this.co_authors);
          console.log(this.research_fields);
          console.log(this.papers);
        })
        .catch(error =>(console.log(error)));
    },
    mounted() {

      //console.log(this.http_data);
      // if (data.status === "status")
      // {
      //   this.co_authors = data.co_authors;
      //   this.papers = data.papers;
      //   this.research_fields = data.researchFields;
      // }

    }

  }
</script>
