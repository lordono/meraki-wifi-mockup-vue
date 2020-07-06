import { ADD_DATA, UPDATE_WIDTH } from "./mutation-types";

export default {
  [UPDATE_WIDTH](state, width) {
    state.width = width;
  },
  [ADD_DATA](state, new_data) {
    state.data.unshift(new_data);
  }
};
