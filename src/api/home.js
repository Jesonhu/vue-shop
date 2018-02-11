import axios from 'axios';

export function getBanner() {
  const url = '/api/index/ad.jhtml';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
};

export function getProductCategory(storeId) {
  const url = '/api/index/product_category.jhtml';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
};

export function getGuessYouLikeGoods() {
  const url = '/api/index/love.jhtml';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getHotGoods(pageNumber) {
  const url = '/api/index/hot.jhtml';

  return axios.get(url, {
    params: {
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getAlwaysBuyGoods(token) {
  const url = '/api/index/buy.jhtml';

  return axios.get(url, {
    params: {
      token: token
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getRecommendGoods(pageNumber) {
  const url = '/api/index/recommend.jhtml';

  return axios.get(url, {
    params: {
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getNewProducts(pageNumber) {
  const url = '/api/index/new_products.jhtml';

  return axios.get(url, {
    params: {
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
