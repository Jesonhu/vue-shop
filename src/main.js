import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import 'common/stylus/base.styl';

import { Lazyload } from 'vant';
import ErrorImg from './common/image/img_error_small.jpg';

Vue.use(Lazyload, {
  loading: ErrorImg,
  error: ErrorImg
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
