<template>
  <div>
    <!-- <div v-if="connected == false"> -->
    <p>tpaco</p>
    <h5>Please log to your account</h5>
    <button @click="authenticate('google')">auth Google</button>
    <!-- <p style="white-space: pre-line;">{{ message }}</p> -->
    <br />
    <textarea v-model="dest_adress" placeholder="Destinataire"></textarea>
    <textarea v-model="dest_exp" placeholder="Expeditor"></textarea>
    <textarea v-model="object" placeholder="Object"></textarea>
    <textarea v-model="email_content" placeholder="Email"></textarea>
    <button v-on:click="SendRequest">Send email</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dest_adress: "",
      object: "",
      dest_exp: "",
      email_content: "",
    };
  },
  props: ["connected"],
  methods: {
    authenticate: function(provider) {
      this.$auth
        .authenticate(provider)
        .then(function() {
          const google_widget_token = localStorage.getItem(
            "vue-authenticate.vueauth_token"
          );
          localStorage.removeItem("vue-authenticate.vueauth_token");
          localStorage.setItem(
            `${provider}_widget_auth_token`,
            google_widget_token
          );
          // Execute application logic after successful social authentication
        })
        .catch(console.error);
      console.log(localStorage.getItem("google_widget_auth_token"));
    },
    SendRequest() {
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
  },
};
// ID client 802177880418-n2tvfud966k8preldun4c97o5sdh7s3h.apps.googleusercontent.com
// Code secret du client ml_mZkqN6N4Cc5FCKiCgYsEm
// Date de création 31 décembre 2020 à 12:15:10 GMT+1
</script>
