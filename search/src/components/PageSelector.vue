<template xmlns="http://www.w3.org/1999/html">
  <div>
    <p>
      <ResultEntry v-for="paper in current_page" v-bind:key="paper.title"
                   :is-paper="true" v-bind:title="paper.title" v-bind:field="paper.fields"
                   v-bind:time="paper.time" v-bind:author="paper.authors">
        {{paper}}
      </ResultEntry>
    </p>
    <p style="text-align: center">
      <a v-on:click="toNext" v-if='has_next' class="click_text">Next</a>&nbsp &nbsp
      <a v-on:click="toPrevious" v-if='has_previous' class="click_text">Previous</a>
      &nbsp &nbsp 第{{page_index + 1}}页，共{{page_number}}页 &nbsp 跳至第<label>
      <input style="width: 20pt" v-model="page_input" oninput = "value=value.replace(/[^\d]/g,'')">
    </label>页
      <a v-on:click="goTo" class="click_text">Go</a>
    </p>
  </div>
</template>

<script>
  import ResultEntry from "./ResultEntry";

  export default {
      name: "PageSelector",
      components: {ResultEntry, },
      props: ['entries'],
      data: function () {
          return {
            page_size: 6,
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
          return this.page_index !== 0;
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
        }
    },
    }
</script>

<style scoped>
  a.click_text:link    {color:blue;}
  a.click_text:visited {color:blue;}
  a.click_text:hover   {color:red;}
  a.click_text {text-decoration: underline}

</style>
