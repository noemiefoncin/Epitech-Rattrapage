<template>
  <div id="home">
    <!--<div class="container my-5"></div>-->
    <div id="hello">
      Welcome to your homepage! It's nice to see you again :D
    </div>
    <modale v-bind:revele="revele" v-bind:toggleModale="toggleModale"></modale>
    <div v-on:click="toggleModale" class="btn btn-success">
      Click here to add new widgets to your dashboard!
    </div>
    <p></p>
    <ul id="example-1">
      <li id="frame" v-for="(widget, index) in widgets" :key="widget.id">
        <p></p>
        <div class="bloc-modale" v-if="widget.widget == 'AirQuality'">
          {{ "AirQUality" }}
          <airQuality></airQuality>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'CovidFrance'">
          {{ "CovidFrance" }}
          <covidFrance></covidFrance>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'CovidWorld'">
          {{ "CovidWorld" }}
          <covidWorld></covidWorld>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'Weather'">
          {{ "Enter the name of a city to get its weather" }}
          <weatherWidget></weatherWidget>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'NASA'">
          {{ "Enter the name of a planet you'd like to see pictures of" }}
          <searching></searching>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'Spotify'">
          <spotifyWidget></spotifyWidget>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'TemperatureConverter'">
          {{ widget.widget }}
          <tempConvertissorWidget></tempConvertissorWidget>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'WeightConverter'">
          {{ widget.widget }}
          <weightConvertissorWidget></weightConvertissorWidget>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'FacebookWidget'">
          {{ widget.widget }}
          <facebook></facebook>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'TwitterWidget'">
          <twitter></twitter>
        </div>
        <div class="bloc-modale" v-if="widget.widget == 'Testing'">
          {{ widget.widget }}
          <testWidget></testWidget>
        </div>
        <div class="btn-modale btn btn-danger" v-on:click="deleteWidget(index)">
          X
        </div>
        <div class="btn-modale btn btn-danger" v-on:click="refreshWidget">
          R
        </div>
        <p></p>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import Modale from "./Modale";
import { v4 as uuidv4 } from "uuid";
import router from "../router/index";
import WeatherWidget from "./WeatherWidget";
import search from "./CookingWidget";
import TestWidget from "./TestWidget";
import SpotifyWidget from "./SprotifyWidget";
import TempConvertissorWidget from "./TempConvertissorWidget";
import WeightConvertissorWidget from "./WeightConvertissorWidget";
import CovidWorldWidget from "./CovidWorldWidget";
import AirQualityWidget from "./AirQualityWidget";
import CovidFranceWidget from "./CovidFranceWidget.vue";
import FacebookWidget from "./FacebookWidget.vue";
import TwitterWidget from "./TwitterWidget";

export default {
  name: "Home",
  data() {
    return {
      revele: false,
      widgets: [],
    };
  },
  components: {
    modale: Modale,
    weatherWidget: WeatherWidget,
    searching: search,
    tempConvertissorWidget: TempConvertissorWidget,
    testWidget: TestWidget,
    spotifyWidget: SpotifyWidget,
    weightConvertissorWidget: WeightConvertissorWidget,
    airQuality: AirQualityWidget,
    covidFrance: CovidFranceWidget,
    covidWorld: CovidWorldWidget,
    facebook: FacebookWidget,
    twitter: TwitterWidget,
  },
  methods: {
    toggleModale: function () {
      this.revele = !this.revele;
    },
    deleteWidget: function (index) {
      fetch("http://localhost:3000/api/auth/widgetDeleteWidget", {
        method: "post",
        body: JSON.stringify({
          index,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        },
      })
        .then((response) => response.json())
        .then((data) => (this.widgets = data.widgets))
        .catch(console.log);
    },
    refreshWidget: function () {
      console.log("Refreshing the widget");
      window.location.reload();
    },
  },
  created() {
    fetch("http://localhost:3000/api/auth/widgets", {
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: window.localStorage.token,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw data;
        return data;
      })
      .then(
        (data) =>
          (this.widgets = data.widgets.map((widget) => ({
            ...widget,
            id: uuidv4(),
          })))
      )
      .catch((error) => {
        console.log(`Error: ${JSON.stringify(error)}`);
        router.push("/disconnect");
      });
    // this.update();
    // this.timer = setInterval(this.update, this.parameters.refreshRate * 1000);
  },
  update: function () {
    this.date = new Date().toUTCString();
  },
  updateComponent: function () {
    this.componentDate = new Date();
  },
};
</script>

<style scoped>
#hello {
  font-size: 16px;
  padding: 35px;
}

#frame {
  background-image: url(../images/background.jpg);
  /* No it is the background of the widget not the frame itself */
  padding-top: 30px;
  border: 1px solid red;
  display: inline-block;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 3px;
  width: 450px;
}
</style>
