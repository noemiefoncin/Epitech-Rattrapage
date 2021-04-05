<template>
  <div>
    <!-- <div v-if="connected == false"> -->
    <button @click="authenticate('google')">auth Google</button>
    <button @click="logout()">Disconnect</button>
    <!-- <p style="white-space: pre-line;">{{ message }}</p> -->
    <br />
    <div v-if="google_widget_token">
      <br />
      <textarea v-model="dest_adress" placeholder="Destinataire"></textarea>
      <br />
      <!-- <textarea v-model="dest_exp" placeholder="Expeditor"></textarea> -->
      <textarea v-model="object" placeholder="Object"></textarea>
      <br />
      <textarea v-model="email_content" placeholder="Email"></textarea>
      <br />
      <button v-on:click="SendRequest">Send email</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      google_widget_token: localStorage.getItem("google_widget_auth_token"),
      dest_adress: "",
      object: "",
      dest_exp: "",
      email_content: "",
    };
  },
  props: ["connected"],
  methods: {
    authenticate: function(provider) {
      var tmp = this;
      this.$auth
        .authenticate(provider)
        .then(function() {
          tmp.google_widget_token = localStorage.getItem(
            "vue-authenticate.vueauth_token"
          );
          localStorage.removeItem("vue-authenticate.vueauth_token");
          localStorage.setItem(
            `${provider}_widget_auth_token`,
            tmp.google_widget_token
          );

          // Execute application logic after successful social authentication
          window.location.reload();
          console.log(localStorage.getItem("google_widget_auth_token"));
        })
        .catch(console.error);
    },
    SendRequest() {
      this.getUserEmailAdress();
      fetch("http://localhost:3000/api/auth/sendEmail", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_destinataire: this.dest_adress,
          email_expediteur: this.dest_exp,
          objet: this.object,
          email: this.email_content,
          // email: email_content,
          google_access_token: localStorage.getItem("google_widget_auth_token"),
        }),
      }).then((res) => {
        console.log(res);
      });
    },
    logout() {
      this.google_widget_token = "";
    },
    async getUserEmailAdress() {
      fetch("https://gmail.googleapis.com/gmail/v1/users/me/profile", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " + localStorage.getItem("google_widget_auth_token"),
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        });
    },
  },
};
// ID client 802177880418-n2tvfud966k8preldun4c97o5sdh7s3h.apps.googleusercontent.com
// Code secret du client ml_mZkqN6N4Cc5FCKiCgYsEm
// Date de création 31 décembre 2020 à 12:15:10 GMT+1
</script>
