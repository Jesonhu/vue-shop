import axios from 'axios';

export function findRoots() {
  const url = '/api/productCategory.jhtml';

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function findChildren(firstCategoryId) {
  const url = '/api/productCategory/children.jhtml';

  return axios.get(url, {
    params: {
      id: firstCategoryId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function findProducts(categoryId, pageNumber, orderType) {
  const url = '/api/productCategory/goods.jhtml';

  return axios.get(url, {
    params: {
      id: categoryId,
      pageNumber: pageNumber,
      orderType: orderType
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
