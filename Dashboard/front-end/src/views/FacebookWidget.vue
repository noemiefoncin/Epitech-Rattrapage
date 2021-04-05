<template>
  <div id="app">
    <br />
    <facebook-login
      class="button"
      appId="941167753297930"
      @login="onLogin"
      @logout="onLogout"
      @get-initial-status="getUserData"
      @sdk-loaded="sdkLoaded"
    >
    </facebook-login>
    <br />
    <br />
    <div v-if="isConnected" class="information">
      <h5>My Facebook Information</h5>
      <div class="well">
        <div class="list-item">
          <img :src="picture" />
        </div>
        <div class="list-item">
          <i>{{ name }}</i>
        </div>
        <div class="list-item">
          <i>{{ email }}</i>
        </div>
        <div class="list-item">
          <i>{{ personalID }}</i>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>
<script>
import facebookLogin from "facebook-login-vuejs";

export default {
  name: "App",
  components: {
    facebookLogin,
  },
  data() {
    return {
      isConnected: false,
      name: "",
      email: "",
      personalID: "",
      picture: "",
      FB: undefined,
    };
  },
  methods: {
    getUserData() {
      this.FB.api("/me", "GET", { fields: "id,name,email,picture" }, (user) => {
        this.personalID = user.id;
        this.email = user.email;
        this.name = user.name;
        this.picture = user.picture.data.url;
      });
    },
    sdkLoaded(payload) {
      this.isConnected = payload.isConnected;
      this.FB = payload.FB;
      if (this.isConnected) this.getUserData();
    },
    onLogin() {
      this.isConnected = true;
      this.getUserData();
    },
    onLogout() {
      this.isConnected = false;
    },
  },
};
</script>

<style>
#app {
  width: 100;
  height: 100;
}
.information {
  margin-top: 100px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
.well {
  background-color: rgb(191, 238, 229);
  margin: auto;
  padding: 50px 50px;
  border-radius: 20px;
}
.login {
  width: 200px;
  margin: auto;
}
.list-item:first-child {
  margin: 0;
}
.list-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.button {
  margin: auto;
}
</style>
