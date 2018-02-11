import * as types from './mutation-types';

const mutations = {
  [types.SET_SKU](state, sku) {
    state.sku = sku;
  },
  [types.SET_SKU_STATUS](state, bol) {
    state.skuStatus = bol;
  },
  [types.SET_SKU_GOODS](state, goods) {
    state.skuGoods = goods;
  },
  [types.SET_SKU_GOODSID](state, goodsId) {
    state.skuGoodsId = goodsId;
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
  },
  [types.SET_SHOPCART_COUNT](state, count) {
    state.shopcartCount = count;
  },
  [types.SET_CHECK_ORDER](state, order) {
    state.checkOrder = order;
  },
  [types.SET_CREATE_ORDER](state, order) {
    state.createOrder = order;
  },
  [types.SET_AREA](state, area) {
    state.area = area;
  },
  [types.SET_REVISE_ADDRESS](state, address) {
    state.reviseAddress = address;
  },
  [types.SET_SELECT_ADDRESS](state, address) {
    state.selectAddress = address;
  },
  [types.SET_ORDER_ACTIVE](state, active) {
    state.orderActive = active;
  }
};

export default mutations;
