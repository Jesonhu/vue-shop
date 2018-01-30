import axios from 'axios';

export function getShopcartCount(cartKey) {
  const url = '/api/cart/sku_quantity';

  return axios.get(url, {
    params: {
      cartKey: cartKey
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function addShopcart(skuId, quantity, cartKey) {
  const url = '/api/cart/add';

  return axios.post(url, {
    skuId: skuId + '',
    quantity: quantity,
    cartKey: cartKey
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getShopcartList(cartKey) {
  const url = '/api/cart/info';

  return axios.get(url, {
    params: {
      cartKey: cartKey
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function modifyQuantity(skuId, quantity, cartKey) {
  const url = '/api/cart/modify';

  return axios.post(url, {
    skuId: skuId + '',
    quantity: quantity,
    cartKey: cartKey
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function remove(skuIds, cartKey) {
  const url = '/api/cart/remove';

  return axios.post(url, {
    skuIds: skuIds + '',
    cartKey: cartKey
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
