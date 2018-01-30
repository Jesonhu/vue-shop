import axios from 'axios';

export function register(username, smsCode, password) {
  const url = '/api/account/register.jhtml';

  return axios.post(url, {
    username: username,
    smsCode: smsCode,
    password: password
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
