import Vue from "vue";
import App from "./views/App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
//  ignore ion-icons prefix
Vue.config.ignoredElements = [/^ion-/];
// stop inheritattributes to parent element
Vue.config.inheritAttrs = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
