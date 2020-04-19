<template>
    <div class="main_body">

        <p>{{welcome}}</p>
        <br><br>
        <input class='search' v-model="query" placeholder="What do you want to know?"> <br>
        <p>
          <input type="radio" id="scholar_box" value="scholar" name="select" v-model="search_type" checked="true">
          <label for="scholar_box">Search for scholars</label>
          &nbsp &nbsp &nbsp &nbsp &nbsp
          <input type="radio" id="paper_box" value="paper" name="select" v-model="search_type">
          <label for="paper_box">Search for papers</label>
        </p>
        <button class="buttons" type="button" v-on:click="toSearch">Search!</button>
    </div>

</template>

<script>
  const max_query_len = 36;
  export default {
      name: 'Homepage',
      props: {
          welcome: String,
      },
      data: function () {
          return {
              query: "",
              results: {},
              search_type: 'scholar',
          }
      },
      methods: {
          toSearch: function () {
              if (this.query === "")
                  alert("you have entered nothing!");
              else {
                if (this.query.length >= max_query_len)
                  this.query = this.query.substr(0, max_query_len);   // truncate overly long queries
                var stype = '/' + this.search_type;
                this.$router.push('/result/' + this.query + stype + '/all-time');

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
    table {
    width: 100%; text-align: left
    }
  td.right {
    width: 20%; margin-left: 20px
  }

</style>
