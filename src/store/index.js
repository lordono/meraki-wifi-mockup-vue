import Vue from "vue";
import Vuex from "vuex";
// import guide from "./modules/guide";

// import local states/mutations/actions/getters
import state from "./state";
import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  // modules: {
  //   guide
  // },
  state,
  getters,
  actions,
  mutations
});
