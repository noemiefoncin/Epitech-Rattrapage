<template>
  <div class="search">
    <h2>Search your favourite Planet</h2>
    <form v-on:submit.prevent="getResult(query)">
      <input type="text" placeholder="Type in your search" v-model="query" />
    </form>
   <div class="results" v-if="results">
      <!-- <div v-for="result in results" :key="result">  -->
        <!-- <img v-bind:src="result.links.href[0]" /> -->
       <img v-bind:src="results[0].links[0].href" />
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "search",
  data() {
    return {
      msg: "Search",
      query: "",
      results: "",
    };
  },
  methods: {
    getResult(query) {
      axios
        .get(
          "https://images-api.nasa.gov/search?q=" + query + "&media_type=image"
        )
        .then((response) => {
 
          console.log(response.data.collection.items);
          this.results = response.data.collection.items;
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
template {
  height: 50px;
}

.results img {
  height: 200px;
  margin: 10px;
}

.results {
  height: 300px;
}

.search {
  height: 200px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
