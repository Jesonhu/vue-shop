const storeage = window.localStorage;

const STORE_KEY = '__store__';
const USER_KEY = '__user__';
const CART_KEY = '__cart__';
const SEARCH_KEY = '__search__';

export function saveStore(store) {
  storeage.setItem(STORE_KEY, JSON.stringify(store));
}

export function getStore() {
  return JSON.parse(storeage.getItem(STORE_KEY));
}

export function saveToken(token) {
  storeage.setItem(`${USER_KEY}token`, token);
}

export function getToken() {
  return storeage.getItem(`${USER_KEY}token`);
}

export function saveUserInfo(info) {
  storeage.setItem(USER_KEY, info);
}

export function getUserInfo() {
  return JSON.parse(storeage.getItem(USER_KEY));
}

export function clearStorage() {
  storeage.clear();
}

export function saveCartKey(cartKey) {
  storeage.setItem(CART_KEY, cartKey);
}

export function getCartKey() {
  return storeage.getItem(CART_KEY);
}

export function saveSearch(keyword) {
  const _arr = JSON.parse(storeage.getItem(SEARCH_KEY));

  if (!_arr) {
    let arr = [];
    arr.push(keyword);
    storeage.setItem(SEARCH_KEY, JSON.stringify(arr));
  } else {
    for (var i = 0; i < _arr.length; i++) {
      if (_arr[i] === keyword) {
        return false;
      }
    }
    _arr.push(keyword);
    storeage.setItem(SEARCH_KEY, JSON.stringify(_arr));
  }
}

export function getSearch() {
  return JSON.parse(storeage.getItem(SEARCH_KEY));
}

export function clearHistory() {
  storeage.removeItem(SEARCH_KEY);
}
