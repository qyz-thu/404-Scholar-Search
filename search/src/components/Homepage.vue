<template>
    <div>
        <br><br>
        <h1>404 Scholar Search</h1>
        <p>{{welcome}}</p>
        <br><br>
        <input class='search' v-model="query" placeholder="What do you want to know?"> <br>
        <button class="buttons" type="button" v-on:click="toSearch">Search!</button>
    </div>

</template>

<script>

    export default {
        name: 'Homepage',
        props: {
            welcome: String
        },
        data: function () {
            return {
                query: ""
            }
        },
        methods: {
            toSearch: function () {
                if (this.query === "")
                    alert("you've entered nothing!");
                else {
                  alert("you have searched for " + this.query);
                  this.$router.push('/result/' + this.query);
                }
            }
        }
    }


</script>

<style type="text/css">
    .search {width: 40%; margin-top: 10px;  line-height: 30px}
    .buttons {width: 100px; height: 50px; margin-top: 20px; margin-bottom: 150px; font-size: 18px}

</style>
