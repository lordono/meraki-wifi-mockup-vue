import * as types from "./mutation-types";

export default {
  addData({ commit }, new_data) {
    commit(types.ADD_DATA, new_data);
  },
  updateWidth({ commit }, new_width) {
    commit(types.UPDATE_WIDTH, new_width);
  }
};
