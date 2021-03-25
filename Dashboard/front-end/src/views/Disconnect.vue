<template>
  <div>
    <h3>You have been disconnected successfully.</h3>
    <h3>
      To be able to navigate though the website, you need to authentificate.
    </h3>
    <div id="login">
      <div>
        <label for="username">Username:</label>
        <input
          :value="emailLogin"
          @input="setEmailLogin"
          type="text"
          name="username"
        />
      </div>
      <div>
        <label for="pass">Password :</label>
        <input
          :value="passwordLogin"
          @input="setPasswordLogin"
          type="password"
          name="password"
          minlength="8"
          required
        />
      </div>
      <button @click="login">Welcome back</button>
    </div>
    <div id="signup">
      <div>
        <label for="username">Username:</label>
        <input
          :value="emailCreateAccount"
          @input="setEmailCreateAccount"
          placeholder="0"
          type="text"
          name="username"
        />
      </div>
      <div>
        <label for="pass">Password (8 characters minimum):</label>
        <input
          :value="passwordCreateAccount"
          @input="setPasswordCreateAccount"
          type="password"
          name="password"
          minlength="8"
          required
        />
      </div>
      <div>
        <label for="pass">Re-type your password here:</label>
        <input
          :value="passwordConfirmCreateAccount"
          @input="setPasswordConfirmCreateAccount"
          type="password"
          name="password"
          minlength="8"
          required
        />
      </div>
      <button @click="signup">Create your profile</button>
    </div>
    <p></p>
    <g-signin-button
      :params="googleSignInParams"
      @success="onSignInSuccess"
      @error="onSignInError"
    >
      Sign in with Google
    </g-signin-button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      widgetName: "",
      emailLogin: "",
      passwordLogin: "",
      emailCreateAccount: "",
      passwordCreateAccount: "",
      passwordConfirmCreateAccount: "",
      googleSignInParams: {
        client_id:
          "802177880418-n2tvfud966k8preldun4c97o5sdh7s3h.apps.googleusercontent.com",
      },
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      //génerer un mot de passe unique, pas des infos qui vont changer
      //const profile = googleUser.getBasicProfile();
      //faire un fetch comme sur le login, catch une erreur si l'utiliste pas et faire sur un autre fetch sur signup
      //si le login fail c'est parce qu'il y a un vrai pb sur le back.
      const basicProfile = googleUser.getBasicProfile();
       fetch("http://localhost:3000/api/auth/OAuthLogin", {
        method: "post",
        body: JSON.stringify({
          email: basicProfile.getEmail(),
          password: basicProfile.getId(), 
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => console.log(response) ?? response.json())
        .then((data) => (window.localStorage.token = data.token))
        .catch(console.log);
      console.log(googleUser.getBasicProfile().getEmail(),googleUser.getBasicProfile().getId());
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log("OH NOES", error);
    },
    //permet de ne pas récupérer la data directement depuis le front
    login: function() {
      fetch("http://localhost:3000/api/auth/login", {
        method: "post",
        body: JSON.stringify({
          email: this.emailLogin,
          password: this.passwordLogin,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => (window.localStorage.token = data.token))
        .catch(console.log);
    },
    setEmailLogin(e) {
      this.emailLogin = e.target.value;
      console.log(this.emailLogin);
    },
    setPasswordLogin(e) {
      this.passwordLogin = e.target.value;
    },

    signup: function() {
      fetch("http://localhost:3000/api/auth/signup", {
        method: "post",
        body: JSON.stringify({
          email: this.emailCreateAccount,
          password: this.passwordCreateAccount,
          passwordConfirm: this.passwordConfirmCreateAccount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(console.log);
    },

    setEmailCreateAccount(e) {
      this.emailCreateAccount = e.target.value;
      console.log(this.emailCreateAccount);
    },
    setPasswordCreateAccount(e) {
      this.passwordCreateAccount = e.target.value;
    },
    setPasswordConfirmCreateAccount(e) {
      this.passwordConfirmCreateAccount = e.target.value;
    },
  },
};
</script>

<style scoped>
#login {
  font-size: 20px;
  padding: 40px;
  margin-top: 120px;
}

#new_profile {
  font-size: 20px;
  padding: 15px;
  margin-top: 130px;
}

button {
  background-image: url(../images/background.jpg);
  padding: 10px;
  width: 201px;
  height: 50px;
  font-size: 16px;
}
</style>
