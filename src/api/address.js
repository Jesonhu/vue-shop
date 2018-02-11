import axios from 'axios';

export function getAddressList(token, pageNumber) {
  const url = '/api/member/receiver/list.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      pageNumber: pageNumber
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function addAddress(token, receiver) {
  const url = '/api/member/receiver/save.jhtml';

  return axios.post(url, {
    token: token,
    'receiver.consignee': receiver.consignee,
    'receiver.phone': receiver.phone,
    'receiver.area_id': receiver.area_id,
    'receiver.address': receiver.address
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function getArea(token, parentId) {
  const url = '/api/member/receiver/area.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      parentId: parentId
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function reviseAddress(token, receiver) {
  const url = '/api/member/receiver/update.jhtml';

  return axios.post(url, {
    token: token,
    'receiver.id': receiver.id,
    'receiver.consignee': receiver.consignee,
    'receiver.phone': receiver.phone,
    'receiver.area_id': receiver.area_id,
    'receiver.address': receiver.address,
    'receiver.is_default': receiver.is_default
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function deleteAddress(token, id) {
  const url = '/api/member/receiver/delete.jhtml';

  return axios.get(url, {
    params: {
      token: token,
      id: id
    }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
