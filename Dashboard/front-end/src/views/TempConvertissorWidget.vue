<template>
  <div>
    <link
      href="https://fonts.googleapis.com/css?family=Mukta"
      rel="stylesheet"
    />
    <div class="boxes">
      <select id="options" name="sel">
        <option disabled value="">Please select one</option>
        <option value="F -> C">F -> C</option>
        <option value="F -> K">F -> K</option>
        <option value="C -> F">C -> F</option>
        <option value="C -> K">C -> K</option>
        <option value="K -> F">K -> F</option>
        <option value="K -> C">K -> C</option>
        <option value="R -> C">R -> C</option>
        <option value="R -> F">R -> F</option>
        <option value="R -> K">R -> K</option>
        <option value="C -> R">C -> R</option>
        <option value="F -> R">F -> R</option>
        <option value="K -> R">K -> R</option>
      </select>
      <br>
      <br>
      <input id="in" name="message" placeholder="Input" />
      <br>
      <br>
      <input id="out" name="out" placeholder="Output" />
      <br>
      <br>
    </div>
    <div id="vm">
      <button v-on:click="convert" id="btn-convert" type="button" class="btn-convert">
        Convert
      </button>
      <br>
      <br>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "TempConvertissorWidget",
  el: "#btn",
  methods: {
    convert: function() {
      const sel = document.querySelector("select[name=sel]").value;
      Vue.prototype.$oldTemp = parseFloat(
        document.querySelector("input[name=message]").value
      );
      Vue.prototype.$newTemp;
      if (sel == "F -> C") {
        this.$newTemp = ((this.$oldTemp - 32) * 5) / 9;
      } else if (sel == "F -> K") {
        this.$newTemp = ((this.$oldTemp + 459.67) * 5) / 9;
      } else if (sel == "C -> F") {
        this.$newTemp = (this.$oldTemp * 9) / 5 + 32;
      } else if (sel == "C -> K") {
        this.$newTemp = this.$oldTemp + 459.67;
      } else if (sel == "K -> F") {
        this.$newTemp = (this.$oldTemp * 9) / 5 - 459.67;
      } else if (sel == "K -> C") {
        this.$newTemp = this.$oldTemp - 273.15;
      } else if (sel == "R -> C") {
        this.$newTemp = ((this.$oldTemp - 491.67) * 5) / 9;
      } else if (sel == "R -> F") {
        this.$newTemp = this.$oldTemp - 459.67;
      } else if (sel == "R -> K") {
        this.$newTemp = (this.$oldTemp * 5) / 9;
      } else if (sel == "C -> R") {
        this.$newTemp = ((this.$oldTemp + 273.15) * 9) / 5;
      } else if (sel == "F -> R") {
        this.$newTemp = this.$oldTemp + 459.67;
      } else if (sel == "K -> R") {
        this.$newTemp = (this.$oldTemp * 9) / 5;
      }
      document.querySelector("input[name=out]").value = this.$newTemp.toFixed(
        1
      );
    },
  },
};
</script>

<style scoped>
body {
  background-color: #8daa91;
  font-family: "Mukta", sans-serif;
}
.btn-convert {
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.title {
  text-align: center;
}
.boxes {
  font-size: 20px;
  margin: 0 auto;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  padding-top: 2%;
}

#out,
#in,
#options,
#btn {
  border: 10px;
  border-color: black ;
  text-align: center;
}
#btn {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
</style>
