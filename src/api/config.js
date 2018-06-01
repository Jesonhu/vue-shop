import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
import Router from '../router';

export const ERR_OK = 1;

export const ERR_ERROR = 2;

export const TOKEN_FAIL = 422;

export const SERVER_ERROR = 500;

export function configHttp() {
  axios.defaults.timeout = 20000;
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  let host = window.location.host;
  switch (host) {
    case 'b2c.jfinalshop.com': // 新版
      axios.defaults.baseURL = 'http://b2c.jfinalshop.com'; // 新版
      break;
    case 'test.jfinalshop.com':
      axios.defaults.baseURL = 'http://test.jfinalshop.com';
      break;
    case 'localhost:8080' :
      axios.defaults.baseURL = 'http://b2c.jfinalshop.com'; // 新版
      break;
    case 'localhost:8081' :
      axios.defaults.baseURL = 'http://192.168.9.43:8089';
      // axios.defaults.baseURL = 'http://b2b2c.omengo.com';
      break;
    case '192.168.9.76:8060':
      axios.defaults.baseURL = 'http://192.168.9.43:8060'; // 新版
      break;
    case '192.168.9.76:8081':
      axios.defaults.baseURL = 'http://192.168.9.43:8089';
      // axios.defaults.baseURL = 'http://b2b2c.omengo.com';
      break;
    default:
      axios.defaults.baseURL = 'http://b2c.jfinalshop.com';
  }
  axios.interceptors.request.use((config) => {
    Toast.setDefaultOptions({
      forbidClick: true
    });
    Toast.loading({ mask: false, duration: 0 });
    if (config.method === 'post') {
      config.data = qs.stringify(config.data);
    }
    return config;
  }, (error) => {
    Toast('参数错误!');
    return Promise.reject(error);
  });
  axios.interceptors.response.use(function (response) {
    /**
     * ERR_ERROR 都为错误状态码
     */
    if (response.data.code === ERR_ERROR) {
      Toast(response.data.message);
    }

    if (response.data.code === TOKEN_FAIL) {
      Toast(response.data.message);
      Router.push('/member');
      window.localStorage.clear();
      window.location.reload();
    }

    if (response.data.code === SERVER_ERROR) {
      // Toast(response.data.message);
      Toast('server error');
    }
    if (response.data) {
      Toast.clear();
    }
    return response;
  }, function (error) {
    // Do something with response error
    Toast('您的网络差,请稍后重试!');
    return Promise.reject(error);
  });
};
