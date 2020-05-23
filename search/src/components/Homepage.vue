<template>
    <div class="main_body" style="text-align: center">
      <p>{{welcome}}</p>
      <br><br>

      <el-input class='search' style="width: 40%; margin-top: 10px;  line-height: 30px; border-radius: 5px"
                v-model="query" placeholder="What do you want to know?"></el-input><br>
      <p>
        <el-radio style="zoom: 120%" v-model="search_type" label="author">Search for scholars</el-radio>
        <el-radio style="zoom: 120%" v-model="search_type" label="paper">Search for papers</el-radio>
      </p>

      <el-button type="primary" style="font-size: 15px" icon="el-icon-search" v-on:click="toSearch">Search</el-button>
      <br><br>
      <Chart id="test" :option="Option"></Chart>
      <button v-on:click="change_papernum">Change</button>

      <body style="height: 350px; width: 700px; margin: 0 auto; border-style: solid; border-width: 4px; border-color: deepskyblue">
        <el-carousel trigger="click" height="400px" style="vertical-align: center">
          <el-carousel-item style="">
            <img src="../assets/tutorial1.png" width="100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/tutorial2.png" width="100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/tutorial3.png" width="100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/tutorial4.png" width="100%">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../assets/tutorial4.png" width="100%">
          </el-carousel-item>
        </el-carousel>
      </body>

      <p style="padding-top: 50px">Contact: <el-link style="font-size: 15px">qyz17@mails.tsinghua.edu.cn</el-link></p>
    </div>

</template>

<script>
  import { axiosInstance } from '../axios_config.js';
  import Chart  from "./Chart";
  const max_query_len = 36;
  export default {
      name: 'Homepage',
      props: {
          welcome: String,
      },
    computed: {
      Option: function () {
        return {
          xAxis: {
            data: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010',
              '2011', '2012', '2013', '2014', '2015']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: this.paper_num,
            type: 'line',
            smooth: true
          }]
        }
      }
    },
    components: {Chart},
      data: function () {
          return {
              query: "",
              results: {},
              search_type: 'author',
              orgOptions: {},
              paper_num: [],
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
          },
          change_papernum: function () {
            this.paper_num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
          }
      },
    mounted() {
        // this.$axios.get("http://123.57.231.102:8080/homepage_log");
        axiosInstance({ url: '/homepage_log'});
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
