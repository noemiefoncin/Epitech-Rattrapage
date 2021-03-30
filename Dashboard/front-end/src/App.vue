<template>
  <div id="fb">
    <div id="navigate">
      <router-link to="/"><button>Homepage</button></router-link>
     <!-- <router-link to="/about"><button>Credits</button></router-link> -->
       <router-link to="/disconnect"><button v-on:click="disconnect_user">Click here to disconnect!</button></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
  
  methods:{
    disconnect_user() {
        localStorage.token = ""
        console.log("The token has been destroyed");
    }
  }
  }
  
</script>

<style>
#fb {
  background-image: url(./images/background.jpg);
  background-size: cover;
  background-position: center;
  width: 1910px;
  height: 1070px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navigate {
  padding: 3px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

button {
  background-image: url(./images/background.jpg);
  background-color: lightgreen;
  padding: 10px;
  margin-top: 1px;
  margin-right: 21px;
  width: 201px;
  height: 50px;
  font-size: 16px;
}
</style>
