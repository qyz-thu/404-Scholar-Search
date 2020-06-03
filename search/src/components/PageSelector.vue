<template xmlns="http://www.w3.org/1999/html">
  <div>
    <p v-if="isPaper">
      <ResultEntry @change_author="change_author"  v-for="paper in current_page" v-bind:key="paper.title"
                   :is-paper="true" v-bind:title="paper.title" v-bind:field="paper.fields"
                   v-bind:time="paper.time" v-bind:author="paper.authors"
                   @mouseover.native="highlight(paper)" @mouseleave.native="de_highlight">
        {{paper}}
      </ResultEntry>
    </p>

    <p v-else>
      <ResultEntry @change_author="change_author" @click_field="click_field" v-for="people in current_page" v-bind:key="people.name"
                   v-bind:name="people.name"
                   v-bind:hindex="people.H_index"
                   v-bind:research_field="people.researchFields" v-bind:publish="people.pc" v-bind:citation="people.cn" >

      </ResultEntry>
    </p><br>

    <p style="text-align: center; font-family: Arial,serif; color: #909399">
      <el-button v-on:click="toNext" v-if='has_next' type="info" size="small">Next</el-button>&nbsp &nbsp
      <el-button v-on:click="toPrevious" v-if='has_previous' type="info" size="small">Prev</el-button>
      &nbsp &nbsp 第{{page_index + 1}}页，共{{page_number}}页 &nbsp 跳至第
      <label>
      <input style="width: 15pt; text-align: center" v-model="page_input" oninput="value=value.replace(/[^\d]/g,'')">
      </label>页
      <el-button size="small" @click="goTo" type="info" circle>Go</el-button>
    </p>

  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";

  export default {
      name: "PageSelector",
      components: {ResultEntry, },
      props: ['entries', "isPaper"],
      data: function () {
          return {
            page_size: 5,
            page_index: 0,
            page_input: 1,
          }
      },
      computed: {
          page_number: function () {
            return Math.ceil(this.entries.length / this.page_size);
          },
          current_page: function () {
            if (this.page_index + 1 < this.page_number)
            {
              return this.entries.slice(this.page_index * this.page_size, (this.page_index + 1) * this.page_size);
            }
            else
            {
              return this.entries.slice(this.page_index * this.page_size, this.entries.length);
            }
          },
        has_next: function () {
          return this.page_index + 1 < this.page_number;
        },
        has_previous: function () {
          return this.page_index > 0;
        }
      },
    methods: {
      toNext: function () {
          this.page_index += 1;
        },
      toPrevious: function () {
          this.page_index -= 1;
        },
      goTo: function () {
          console.log(this.page_input);
          if (this.page_input > this.page_number) {
            this.page_index = this.page_number - 1;
            this.page_input = this.page_number;
          }
          else if (this.page_input <= 0) {
            this.page_index = 0;
            this.page_input = 1;
          }
          else this.page_index = Number(this.page_input) - 1;
        },
      change_author: function (aut) {
        console.log("change author to " + aut);
        this.page_index = 0;
        this.$emit('update', aut);
      },
      highlight: function (paper) {
        // console.log("enter paper");
        // console.log(paper.title);
        this.$emit("highlight", paper.authors);
      },
      de_highlight: function () {
        // console.log("leave paper");
        // console.log(paper.title);
        this.$emit('dlight');
      },
      reset: function () {
        this.page_index = 0;
      },
      click_field: function (field) {
        console.log('click field' + field);
        this.$emit('search_field', field);
      },
    },
    }
</script>

<style scoped>
  a.click_text:link    {color: #ecf5ff;}
  a.click_text:visited {color:blue;}
  a.click_text:hover   {color:red;}
  a.click_text {text-decoration: underline}

</style>
