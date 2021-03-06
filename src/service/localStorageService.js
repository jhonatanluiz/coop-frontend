const LocalStorageService = {
    contains: key => localStorage.getItem(key) !== null,
    get: key => JSON.parse(localStorage.getItem(key)),
    set: (key, value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    remove: key => {
      localStorage.removeItem(key);
    },
    clear: () => {
      localStorage.clear();
    }
  };
  
  export default LocalStorageService;
  