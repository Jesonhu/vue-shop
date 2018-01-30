import axios from 'axios';

export function sendSms(username, smsType) {
  const url = '/api/account/send_sms.jhtml';

  return axios.get(url, {
    params: {
      username: username,
      smsType: smsType
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
