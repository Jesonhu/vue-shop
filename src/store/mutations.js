import * as types from './mutation-types';

const mutations = {
  [types.SET_SKU_STATUS](state, bol) {
    state.skuStatus = bol;
  },
  [types.SET_CHOSEN_CONTACT_ID](state, chosenContactId) {
    state.chosenContactId = chosenContactId;
  }
};

export default mutations;
