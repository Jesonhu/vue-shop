import axios from 'axios';

export function checkPassword(token, currentPassword) {
  const url = '/api/member/password/check_current_password.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      currentPassword: currentPassword
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function upatePassword(token, currentPassword, password) {
  const url = '/api/member/password/update.jhtml';

  return axios.post(url, {
    token: token,
    currentPassword: currentPassword,
    password: password
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
