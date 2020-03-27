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
      <a class="click_text">Next</a>&nbsp &nbsp <a class="click_text">Previous</a>
      &nbsp &nbsp 第{{page_index}}页，共{{page_number}}页 &nbsp 跳至第<label>
      <input style="width: 20pt" oninput = "value=value.replace(/[^\d]/g,'')">
    </label>页
      <a class="click_text">Go</a>
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
            results: this.entries,
            //page_number: 1,

          }
      },
      computed: {
          page_number: function () {
            // console.log(this.results);
            // console.log(this.entries);
            return Math.ceil(this.entries.length / this.page_size);
          },
          current_page: function () {
            if (this.page_index + 1 < this.page_number)
            {
              let cur = [];
              console.log(this.page_index);
              console.log(this.page_number);
              for (let i = this.page_index * this.page_size; i < (this.page_index + 1) * this.page_size; i++)
                cur.push(this.entries[i]);
              console.log("current pages:");
              console.log(cur);
              return cur;
            }
            else
            {

              let cur = [];
              console.log(this.page_index);
              console.log(this.page_number);
              for (let i = this.page_index * this.page_size; i < (this.page_index + 1) * this.page_size; i++)
                cur.push(this.entries[i]);
              console.log("current pages:");
              console.log(cur);
              this.$forceUpdate();
              return cur;
            }
          }
      }
    }
</script>

<style scoped>
  a.click_text:link    {color:blue;}
  a.click_text:visited {color:blue;}
  a.click_text:hover   {color:red;}
  a.click_text {text-decoration: underline}

</style>
