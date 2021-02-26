import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import AuthContext from "./context/auth.context";
import useAuth from "./hooks/auth.hook";
import "materialize-css";
import "./App.css";

function App() {
  const { token, login, logout, userId, ready, userRole } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated, userRole);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ token, login, logout, userId, isAuthenticated, userRole }}
    >
      <Router>{routes}</Router>
    </AuthContext.Provider>
  );
}

export default App;
