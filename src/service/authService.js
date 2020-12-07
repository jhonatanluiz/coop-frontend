const TOKEN_KEY = '@token';


const AuthService = {
  isAuthenticated: () => localStorage.getItem(TOKEN_KEY) !== null,
  getToken: () => localStorage.getItem(TOKEN_KEY),
  login: token => {
    localStorage.setItem(TOKEN_KEY, token);
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
  }
};

export default AuthService;
