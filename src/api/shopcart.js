import axois from 'axios';

export function getShopcartCount(cartKey) {
  const url = '/api/cart/count.jhtml';

  return axois.get(url, {
    params: {
      cartKey: cartKey
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function addShopcart(productId, quantity, cartKey) {
  const url = '/api/cart/add.jhtml';

  return axois.post(url, {
    productId: productId,
    quantity: quantity,
    cartKey: cartKey
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getShopcartList(cartKey) {
  const url = '/api/cart/list.jhtml';

  return axois.get(url, {
    params: {
      cartKey: cartKey
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function deleteShopcartItem(cartKey, ids) {
  const url = '/api/cart/delete.jhtml';

  return axois.get(url, {
    params: {
      cartKey: cartKey,
      ids: ids
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function modifyShopcart(productId, quantity, cartKey) {
  const url = '/api/cart/modify.jhtml';

  return axois.post(url, {
    productId: productId,
    quantity: quantity,
    cartKey: cartKey
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
