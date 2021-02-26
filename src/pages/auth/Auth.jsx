import React, { useState, useContext, useEffect } from "react";
import useHttp from "../../hooks/http.hook";
import AuthContext from "../../context/auth.context";
import useMessage from "../../hooks/message.hook";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { loading, request, error, clearError } = useHttp();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/auth/signup", "POST", { ...form });
      if (data.message) {
        message(data.message);
      }
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/auth/signin", "POST", { ...form });
      auth.login(data.token, data._id, data.role);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s2 offset-s5">
        <div className="card indigo lighten-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field">
                <input
                  id="email"
                  type="text"
                  name="email"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field">
                <input
                  id="password"
                  type="password"
                  name="password"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              disabled={loading}
              onClick={loginHandler}
            >
              Signin
            </button>
            <button
              className="btn grey lighten-1 black-text"
              disabled={loading}
              onClick={registerHandler}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
