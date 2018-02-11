import axios from 'axios';

export function checkOrder(token, cartKey, productIds) {
  const url = '/api/order/checkout.jhtml';

  return axios.post(url, {
    token: token,
    cartKey: cartKey,
    productIds: productIds
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function createOrder({ token, cartToken, receiverId, paymentMethodId, memo }) {
  const url = '/api/order/create.jhtml';

  return axios.post(url, {
    token: token,
    cartToken: cartToken,
    receiverId: receiverId,
    paymentMethodId: paymentMethodId,
    memo: memo,
    source: 'H5'
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getOrderList(token, status, pageNumber) {
  const url = '/api/member/order/list.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      status: status,
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getOrderDetail(token, sn) {
  const url = '/api/member/order/view.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn: sn
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function cancelOrder(token, sn) {
  const url = '/api/member/order/cancel.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn: sn
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function deleteOrder(token, sn) {
  const url = '/api/member/order/delete.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn: sn
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function refundsOrder(token, sn, memo) {
  const url = '/api/member/order/refunds.jhtml';

  return axios.post(url, {
    token: token,
    sn: sn,
    memo: memo
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function confirmOrder(token, sn) {
  const url = '/api/member/order/receive.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
