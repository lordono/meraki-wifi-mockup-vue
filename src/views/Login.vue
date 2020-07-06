<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-title">
        <img src="../assets/wifi.png" alt="Logo" class="login-logo" />
        Meraki Wifi Demo
      </div>
      <div class="login-error">{{ error }}</div>
      <form @submit.prevent.once="submitForm">
        <input
          type="text"
          class="login-input"
          placeholder="Username"
          v-model="username"
        />
        <input
          type="password"
          class="login-input"
          placeholder="Password"
          v-model="password"
        />
        <button class="login-btn" type="submit" value="Submit">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// fake credentials
const fakeCredentials = [
  { user: "cisco", password: "cisco" },
  { user: "diet", password: "coke" }
];

export default {
  name: "LoginPage",
  components: {},
  data() {
    return {
      username: "",
      password: "",
      error: ""
    };
  },
  methods: {
    submitForm: function() {
      if (!this.username || !this.password) {
        this.error = "Required fields missing.";
      } else {
        sessionStorage.setItem("auth", false);
        for (let cred of fakeCredentials) {
          if (cred.user === this.username && cred.password === this.password) {
            sessionStorage.setItem("auth", true);
            this.$router.push("/");
            return;
          }
        }
        this.error = "Username and Password mismatch.";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #282c34;
  color: #2c3e50;
  font-size: 0.445em;
  .login-container {
    height: 325px;
    width: 300px;

    padding: 50px;
    background-color: #fafafa;
    border-radius: 10px;

    display: flex;
    flex-direction: column;

    .login-logo {
      width: 48px;
    }

    .login-title {
      font-weight: 100;
      font-size: 2em;
      margin-right: auto;
      margin-bottom: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      .login-logo {
        margin-right: 10px;
      }
    }
    .login-error {
      height: 2em;
      font-size: 1em;
      font-weight: 600;
      color: #ff7875;
    }
    .login-input {
      padding: 15px;
      border-radius: 5px;
      width: calc(100% - 33px);
      font-size: 1em;
      border: 1.5px solid lighten(#282c34, 30%);
      margin: 5px 0;
    }
    .login-btn {
      margin-top: 10px;
      margin-right: auto;
      padding: 15px;
      width: 100%;
      border: none;
      outline: none;
      border-radius: 5px;
      background-color: #282c34;
      color: #fafafa;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: lighten(#282c34, 10%);
      }
    }
  }
}
</style>
