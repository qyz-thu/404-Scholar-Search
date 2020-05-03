<template>
    <div>
    <p style="font-size: 32px">{{field}}</p><br>

      <span>If you see this, it means this page is not yet finished.</span>

    </div>
</template>

<script>
    export default {
      name: "Field",
      data: function () {
        return {
          field: this.$route.params.field,

        }
      },
      mounted() {

      },
    }
</script>

<style scoped>

</style>
