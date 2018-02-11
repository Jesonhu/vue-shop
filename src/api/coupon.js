import axios from 'axios';

export function getAllCoupon(token, isUsed, pageNumber) {
  const url = '/api/member/coupon_code/list.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      isUsed: isUsed,
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getUserCoupon(token) {
  const url = '/api/member/coupon_code/valid.jhtml';

  return axios.get(url, {
    params: {
      token: token
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
