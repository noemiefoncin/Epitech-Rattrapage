<template>
  <div class="bloc-modale" v-if="revele">
    <div class="overlay" v-on:click="toggleModale"></div>
    <div class="modale card">
      <div class="btn-modale btn btn-danger" v-on:click="toggleModale">X</div>
      <h2 id="select-widgets">-Select your widgets in the list down below-</h2>
      <div>
        <h1 />
        <h3>WEATHER</h3>
        <button id="getWeather" v-on:click="getAirQualityWidget">
          Informations about air quality on a given city.
        </button>
        <button id="getWeather" v-on:click="getWeatherWidget">
          Click here to get the weather
        </button>
        <button id="getWeather" v-on:click="getCookingWidget">
          Click here to get a NASA widget
        </button>
      </div>
      <div>
        <h1 />
        <h3>MATHEMATICS</h3>
        <button id="getWeather" v-on:click="getSpotifyWidget">
          Click here to get a calculator
        </button>
      </div>
      <div>
        <h1 />
        <h3>CONVERTERS</h3>
        <button id="getWeather" v-on:click="getTermeratureConverterWidget">
          Click here to get get a temperature converter
        </button>
        <button id="getWeather" v-on:click="getWeightConverterWidget">
          Click here to get get a weight converter
        </button>
      </div>
      <div>
        <h1 />
        <h3>ORGANISATION</h3>
        <button id="getWeather" v-on:click="getTestWidget">
          Click here to get get a todo-list
        </button>
      </div>
      <div>
        <h1 />
        <h3>COVID-19</h3>
        <button id="getWeather" v-on:click="getCovidFranceWidget">
          France's informations about Covid-19
        </button>
        <button id="getWeather" v-on:click="getCovidWorldWidget">
          World's informations about Covid-19
        </button>
      </div>
      <div>
        <h1 />
        <h3>SOCIAL MEDIA</h3>
        <button id="getWeather" v-on:click="getFacebookWidget">
          Connect to facebook
        </button>
        <button id="getWeather" v-on:click="getTwitterWidget">
          Send an email
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modale",
  props: ["revele", "toggleModale"],
  methods: {
    getWeatherWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "Weather",
          parameters: {
            refreshRate: 1000,
            city: "Madrid",
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getCookingWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "NASA",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getSpotifyWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "Spotify",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getTermeratureConverterWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "TemperatureConverter",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getWeightConverterWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "WeightConverter",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getTestWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "Testing",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getCovidFranceWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "CovidFrance",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getCovidWorldWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "CovidWorld",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getAirQualityWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "AirQuality",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getFacebookWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "FacebookWidget",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
    getTwitterWidget: function() {
      fetch("http://localhost:3000/api/auth/widget", {
        method: "post",
        body: JSON.stringify({
          widget: "TwitterWidget",
          parameters: {
            refreshRate: 1000,
          },
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: window.localStorage.token,
        }),
      })
        .then((response) => response.json())
        .catch(console.log);
      window.location.reload();
    },
  },
};
</script>

<style scoped>
#getWeather {
  height: 80px;
}

#getWeightConverter {
  background-color: aliceblue;
}

#getCovid {
  background-color: aliceblue;
}

#getTheWeather {
  background-color: aliceblue;
}

#getMathematics {
  background-color: aliceblue;
}

#getOrganisation {
  background-color: aliceblue;
}

.bloc-modale {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.modale {
  background-image: url(../images/background.jpg);
  background-color: lightgreen;
  /* no its the background of the selection modal */
  color: black;
  padding: 50px;
  position: fixed;
  top: 50px;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}

#select-widgets {
  font-size: 30px;
}
</style>
