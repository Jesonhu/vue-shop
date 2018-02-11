import axios from 'axios';

export function addFavorite(token, goodsId) {
  const url = '/api/member/favorite/add.jhtml';

  return axios.post(url, {
    token: token,
    goodsId: goodsId
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function deleteFavorite(token, id) {
  const url = '/api/member/favorite/delete.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getFavoriteList(token, pageNumber) {
  const url = '/api/member/favorite/list.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
