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
