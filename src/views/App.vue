<template>
  <div id="app" ref="appContent">
    <router-view name="menu" />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
// import { mockData } from "../mockdata";
import debounce from "lodash/debounce";
import { mapActions } from "vuex";

export default {
  name: "App",
  created() {
    this.debouncedGetWidth = debounce(
      () => this.updateWidth(this.getWidth()),
      500
    );
  },
  mounted() {
    this.updateWidth(this.getWidth());
    window.addEventListener("resize", this.debouncedGetWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.debouncedGetWidth);
  },
  methods: {
    ...mapActions(["updateWidth"]),
    getWidth: function() {
      return this.$refs.appContent.clientWidth;
    }
  }
};
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: "Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI",
    "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
    "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #282c34;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  width: 100vw;
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
