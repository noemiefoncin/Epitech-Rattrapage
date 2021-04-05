import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GSignInButton from "vue-google-signin-button";
import VueAxios from "vue-axios";
import VueAuthenticate from "vue-authenticate";
import axios from "axios";

Vue.use(VueAxios, axios);
Vue.use(VueAuthenticate, {
  baseUrl: "http://localhost:3000", // Your API domain
  providers: {
    google: {
      clientId:
        "802177880418-n2tvfud966k8preldun4c97o5sdh7s3h.apps.googleusercontent.com",
      redirectUri: "http://localhost:8080", // Your client app URL
    },
  },
});

Vue.use(GSignInButton);

Vue.config.productionTip = false;

new Vue({
  methods: {
    authenticate: function(provider) {
      this.$auth.authenticate(provider).then(function() {
        console.log("PROVIDER", provider);
        // Execute application logic after successful social authentication
      });
    },
  },
  router,
  render: (h) => h(App),
}).$mount("#app");
