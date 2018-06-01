import axios from 'axios';

export function login(username, smsCode, password) {
  const url = '/api/account/login.jhtml';

  return axios.post(url, {
    username: username,
    smsCode: smsCode,
    password: password
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function loginPassword(username, password) {
  const url = '/api/account/login.jhtml';

  return axios.post(url, {
    username: username,
    password: password
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
