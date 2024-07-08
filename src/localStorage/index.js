export function saveStore(key, store) {
  localStorage.setItem(key, JSON.stringify(store));
}

export function getStore(key) {
  return JSON.parse(localStorage.getItem(key));
}
