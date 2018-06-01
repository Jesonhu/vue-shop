import axios from 'axios';

export function getPayInfo(token, sn) {
  const url = '/api/order/payment.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn: sn
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function pay(token, sn, amount) {
  const url = '/api/payment/submit.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn: sn,
      amount: amount
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getPayResult(token, sn) {
  const url = '/api/payment/pay_result.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      sn: sn
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
