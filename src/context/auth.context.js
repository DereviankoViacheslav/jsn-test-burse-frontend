import { createContext } from "react";

const noop = () => {};

const AuthContext = createContext({
  token: null,
  userId: null,
  userRole: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});

export default AuthContext;
