import axios from 'axios';

export function findRoots(storeId) {
  const url = '/api/productCategory/findRoots';

  return axios.get(url, {
    params: {
      storeId: storeId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function findChildren(productCategoryId, storeId) {
  const url = '/api/productCategory/findChildren';

  return axios.get(url, {
    params: {
      storeProductCategoryId: productCategoryId + '',
      storeId: storeId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function findProducts(productCategoryId, pageNumber, orderType, storeId) {
  const url = '/api/productCategory/findProducts';

  return axios.get(url, {
    params: {
      storeProductCategoryId: productCategoryId + '',
      pageNumber: pageNumber,
      orderType: orderType,
      storeId: storeId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
