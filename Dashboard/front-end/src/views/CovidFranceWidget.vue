<template>
  <div>
    <div>
      <input
        type="text"
        id="position"
        v-model="requete"
        v-on:keypress="goMeteo"
        placeholder="Ex: Rhône, Ain ..."
      />
    </div>
    <p></p>
    <div v-if="temps">
       <h4>Position: {{ temps.LiveDataByDepartement[0].nom}} </h4>
      <h5>In hospital: {{ temps.LiveDataByDepartement[0].hospitalises}}</h5>
      <h5>In reanimation: {{ temps.LiveDataByDepartement[0].reanimation}}</h5>
      <h5>Deaths: {{ temps.LiveDataByDepartement[0].deces}}</h5>
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
    url_recherche: "https://coronavirusapi-france.now.sh/LiveDataByDepartement?Departement=",
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

