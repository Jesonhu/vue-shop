import axios from 'axios';

export function getGoodsDetail(goodsId) {
  const url = '/api/goods/detail.jhtml';

  return axios.get(url, {
    params: {
      id: goodsId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
