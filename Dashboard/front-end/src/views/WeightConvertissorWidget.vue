<template>
  <div>
    <h3>Weight converter</h3>
    <div v-for="weight in weightConvert" :key="weight">
      <label>{{ weight.id }}</label>
      <input
        :id="weight.id"
        type="number"
        placeholder="Pounds"
        v-model="weight.input"
        @input="weightConverter(weight.id)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "weightConvertissorWidget",
  data() {
    return {
      weightConvert: [
        {
          id: "pounds",
          input: 0,
        },
        {
          id: "kilograms",
          input: 0,
        },
        {
          id: "ounces",
          input: 0,
        },
        {
          id: "grams",
          input: 0,
        },
        {
          id: "stones",
          input: 0,
        },
      ],
    };
  },
  methods: {
    weightConverter(source) {
      var vm = this,
        pound = vm.weightConvert[0],
        kilogram = vm.weightConvert[1],
        ounce = vm.weightConvert[2],
        gram = vm.weightConvert[3],
        stone = vm.weightConvert[4];

      if (source == "pounds") {
        kilogram.input = (pound.input / 2.2046).toFixed(2);
        ounce.input = (pound.input * 16).toFixed(2);
        gram.input = (pound.input / 0.0022046).toFixed();
        stone.input = (pound.input * 0.071429).toFixed(3);
      }
      if (source == "kilograms") {
        pound.input = (kilogram.input * 2.2046).toFixed(2);
        ounce.input = (kilogram.input * 35.274).toFixed(2);
        gram.input = (kilogram.input * 1000).toFixed();
        stone.input = (kilogram.input * 0.1574).toFixed(3);
      }
      if (source == "ounces") {
        pound.input = (ounce.input * 0.0625).toFixed(4);
        kilogram.input = (ounce.input / 35.274).toFixed(4);
        gram.input = (ounce.input / 0.035274).toFixed(1);
        stone.input = (ounce.input * 0.0044643).toFixed(4);
      }
      if (source == "grams") {
        pound.input = (gram.input * 0.0022046).toFixed(4);
        kilogram.input = (gram.input / 1000).toFixed(4);
        ounce.input = (gram.input * 0.035274).toFixed(3);
        stone.input = (gram.input * 0.00015747).toFixed(5);
      }
      if (source == "stones") {
        pound.input = (stone.input * 14).toFixed(1);
        kilogram.input = (stone.input / 0.15747).toFixed(1);
        ounce.input = (stone.input * 224).toFixed();
        gram.input = (stone.input / 0.00015747).toFixed();
      }
    },
  },
};
</script>

<style scoped></style>
