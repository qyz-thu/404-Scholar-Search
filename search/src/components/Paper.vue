<template>
  <div style="background: linear-gradient(#fff0e6, white); height: 200%;">
    <el-container style="text-align: center">
      <el-header>
        <p><b style="font-size: 25px">{{title}}</b></p>
      </el-header>

      <el-main style="background-color: #f5f5f5; width: 80%; margin: 20px auto 10px; text-align: left; border-radius: 15px;
              font-size: 16px">
        <div style="font-size: 18px; ">
          Publication time: <b>{{year}}</b><br>
          In <i><b>{{venue}}</b></i><br><br>
        </div>
        <el-divider></el-divider>
        <b>Authors: </b>
        <span v-for="aut in authors"><el-tag v-on:click="click_author(aut)" :href="'#/detail/' + aut" style="cursor: pointer">
        {{aut}}</el-tag>&nbsp
        </span>
        <el-divider></el-divider>
        <b>Abstract: </b>{{abstract}}<br>
      </el-main>
    </el-container>
    <el-button type="primary" v-on:click="back">Back</el-button>

  </div>
</template>

<script>
    import {axiosInstance} from "../axios_config";

    export default {
        name: "Paper",
        components: {},
        props: [],
        data: function () {
          return {
            title: this.$route.params.title,
            authors: [],
            year: 0,
            venue: '',
            abstract: '',
        }
        },
        mounted() {
          axiosInstance({url: 'backend_paperquery?title=' + this.title})
          .then(response =>{
            console.log(response.data);
            if (response.data.result.length !== 0)
            {
                this.authors = response.data.result.authors;
                this.year = response.data.result.time;
                this.venue = response.data.result.venue;
                this.abstract = response.data.result.abstract;
            }
          })
          .catch(error => (console.log(error)));
        },
        methods:
          {
            click_author: function (aut) {
              this.$router.push('../../detail/' + aut);
            },
            back: function () {
              this.$router.go(-1);
            }
          }
    }
</script>

<style scoped>

</style>
