export const savetoLocalStorage = (key, value) => {
  if (key === "authToken") {
    window.localStorage.setItem(key, value);
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
  return;
};

export const getfromLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};
