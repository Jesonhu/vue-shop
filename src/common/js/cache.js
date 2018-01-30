const storeage = window.localStorage;

const STORE_KEY = '__store__';
const USER_KEY = '__user__';

export function saveStore(store) {
  storeage.setItem(STORE_KEY, JSON.stringify(store));
}

export function getStore() {
  return JSON.parse(storeage.getItem(STORE_KEY));
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
