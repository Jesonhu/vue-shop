import * as types from './mutation-types';
import { addShopcart } from 'api/shopcart';
import { checkOrder } from 'api/order';
import { ERR_OK } from 'api/config';
import { getToken } from 'common/js/cache';
import router from '../router';

export const showSku = function ({ commit, state }, { skuStatus, sku, goods, goodsId }) {
  commit(types.SET_SKU_STATUS, skuStatus);
  commit(types.SET_SKU, sku);
  commit(types.SET_SKU_GOODS, goods);
  commit(types.SET_SKU_GOODSID, goodsId);
};

export const buyClick = function ({ commit, state }, obj) {
  if (!getToken()) {
    commit(types.SET_LOGIN_MODAL, true);
    commit(types.SET_SKU_STATUS, false);
    return;
  }

  const productId = obj.goodsId;
  const quantity = obj.selectedNum;
  addShopcart(productId, quantity).then((res) => {
    if (res.code === ERR_OK) {
      checkOrder(getToken(), res.datum.cart_key, productId).then((resd) => {
        if (resd.code === ERR_OK) {
          // this.setCheckOrder(resd.datum);
          // this.setSkuStatus(false);
          // this.setSelectAddress(resd.datum.defaultReceiver);
          // this.$router.push('/shopcart_order');
          commit(types.SET_CHECK_ORDER, resd.datum);
          commit(types.SET_SKU_STATUS, false);
          commit(types.SET_SELECT_ADDRESS, resd.datum.defaultReceiver);
          router.push('/shopcart_order');
        }
      });
    }
  });
};
