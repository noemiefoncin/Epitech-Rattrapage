<template>
  <div>
    <div>
      <input
        type="text"
        id="position"
        v-model="requete"
        v-on:keypress="goMeteo"
        placeholder="Ex: France, Italy ..."
      />
    </div>
    <p></p>
    <div v-if="temps">
      <h4>Position: {{ temps.country}} </h4>
      <h5>Cases: {{ temps.cases }}</h5>
      <h5>Deaths: {{ temps.deaths }}</h5>
      <h5>TotalTests: {{ temps.totalTests }}</h5>
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
      url_recherche: "https://coronavirus-19-api.herokuapp.com/countries/",
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
