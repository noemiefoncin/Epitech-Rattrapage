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
      <h3>Position: {{ temps.name }}</h3>
      <h4>Température : {{ temps.main.temp }}</h4>
      <h4>Temps : {{ temps.weather[0].description }}</h4>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "WeatherWidget",
  data() {
    return {
      requete: "",
      temps: undefined,
      api_code: "962ba5cb8bb3368fbb8b7ca71208af5c",
      url_recherche: "https://api.openweathermap.org/data/2.5/weather?",
    };
  },
  methods: {
    goMeteo(e) {
      console.log(this.requete);
      if (e.key == "Enter") {
        axios
          .get(this.url_recherche, {
            params: {
              q: this.requete,
              units: "metric",
              appid: this.api_code,
              lang: "fr",
            },
          })
          .then((reponse) => {
            console.log(this.url_recherche)
            this.temps = reponse.data;
          });
        this.requete = "";
      }
    },
  },
};
</script>

<style scoped></style>
