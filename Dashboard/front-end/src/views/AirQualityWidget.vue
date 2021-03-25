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
      <h4>Position: {{ temps.data.city.name}} </h4>
      <h5>AQI: {{ temps.data.aqi }}</h5>
      <h5>IDX: {{ temps.data.idx }}</h5>
      <h5>Compagny: {{ temps.data.attributions[0].name}}</h5>
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
      api_code: "/?token=215b696bdd2fe2cb44d62fa7afe6735354e675f4",
      url_recherche: "https://api.waqi.info/feed/",
    }
  },
  methods: {
    goMeteo(e){
            if (e.key == "Enter") {
        axios
        .get(`${this.url_recherche}${this.requete}${this.api_code}`)
        .then(reponse =>{
          this.temps = reponse.data
        })
        this.requete = "";
    }
  }
  }
}
</script>

