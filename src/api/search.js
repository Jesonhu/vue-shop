import axios from 'axios';

export function getHotKye() {
  const url = '/api/index/hot_keyword.jhtml';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function search(keyword) {
  const url = '/api/search.jhtml';

  return axios.post(url, {
    keyword: keyword
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
