import * as types from './mutation-types';

const mutations = {
  [types.SET_SKU_STATUS](state, bol) {
    state.skuStatus = bol;
  },
  [types.SET_CHOSEN_CONTACT_ID](state, chosenContactId) {
    state.chosenContactId = chosenContactId;
  },
  [types.SET_SELECT_STORE](state, store) {
    state.store = store;
  },
  [types.SET_LOGIN_MODAL](state, modalStatus) {
    state.loginModal = modalStatus;
  },
  [types.SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo;
  }
};

export default mutations;
