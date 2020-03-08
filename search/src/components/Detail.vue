<template>
  <div>
    <p>This is the detail page for {{title}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data: function () {
      return {
        title: this.$route.params.title,
      }
    }

  }
</script>
