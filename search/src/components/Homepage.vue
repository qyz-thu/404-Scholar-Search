<template>
    <div class="main_body" style="text-align: center">
      <p>{{welcome}}</p>
      <br><br>

      <el-input class='search' v-model="query" placeholder="What do you want to know?"></el-input> <br>
      <p>
        <el-radio style="zoom: 120%" v-model="search_type" label="scholar">Search for scholars</el-radio>
        <el-radio style="zoom: 120%" v-model="search_type" label="paper">Search for papers</el-radio>
      </p>

      <el-button type="primary" style="font-size: 15px" icon="el-icon-search" v-on:click="toSearch">Search</el-button>

      <br><br>
      <body style="height: 200px; width: 60%; margin: 0 auto;" bgcolor="white">
        <span class="demonstration">Tutorial</span>
        <el-carousel trigger="click" height="150px" style="vertical-align: center">
          <el-carousel-item style="">
            1<br>
            This is a tutorial.
          </el-carousel-item>
          <el-carousel-item>
            2<br>
            We show you how our search engine works.
          </el-carousel-item>
          <el-carousel-item>
            3<br>
            Here you can find scholars that are most similar to the one you search for.
          </el-carousel-item>
        </el-carousel>
      </body>

      <p style="padding-top: 50px">Contact: <el-link style="font-size: 15px">qyz17@mails.tsinghua.edu.cn</el-link></p>
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
            console.log(this.search_type);
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
    .search {width: 50%; margin-top: 10px;  line-height: 30px; border-radius: 5px}
    /*.buttons {*/
    /*  width: 100px;*/
    /*  height: 35px;*/
    /*  !*margin-bottom: 150px;*!*/
    /*  font-size: 16px;*/
    /*  font-weight: bold;*/
    /*  color: white;*/
    /*  border-radius: 6px;*/
    /*  display: inline-block;*/
    /*  background-image: linear-gradient(#8ee4ff, #6bcaff);*/

    /*}*/
    table {
    width: 100%; text-align: left
    }
  td.right {
    width: 20%; margin-left: 20px
  }

</style>
