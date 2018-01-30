import axios from 'axios';

export function getHomeData(storeId) {
  const url = '/api/index';

  return axios.get(url, {
    params: {
      storeId: storeId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
};

export function getStoreList(pageNumber, keyword) {
  const url = '/api/index/store_select';

  return axios.get(url, {
    params: {
      pageNumber: pageNumber,
      keyword: keyword
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
