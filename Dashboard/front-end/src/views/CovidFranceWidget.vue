<template>
  <div>
    <div>
      <input
        type="text"
        id="position"
        v-model="requete"
        v-on:keypress="goMeteo"
        placeholder="Ex: Paris, London..."
      />
    </div>
    <p></p>
    <div v-if="temps">
<img v-bind:src="temps" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "WeatherWidget",
  data() {
    return {
      requete: '',
      temps: undefined,
      url_recherche: "https://http.cat/",
    }
  },
  methods: {
    goMeteo(e){
            if (e.key == "Enter") {
        axios
        .get(`${this.url_recherche}${this.requete}`)
        .then(reponse =>{
          this.temps = reponse.data
        })
        this.requete = "";
    }
  }
  }
}
</script>
