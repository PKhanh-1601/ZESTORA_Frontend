import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LoginSignup.css";
import authApi from "../api/authApi";

const LoginSignup = ({ setToken }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup"); // signup hoặc login
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Register success! Please login.");
      setMode("login");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await authApi.login({
        email: form.email,
        password: form.password,
      });

      const tokenFromServer = res.data.data.token;
      sessionStorage.setItem("token", tokenFromServer); // lưu vào sessionStorage
      setToken(tokenFromServer); // update state App.js

      alert("Login successful!");
      navigate("/"); // redirect về home
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{mode === "signup" ? "Sign Up" : "Login"}</h1>

        <div className="loginsignup-fields">
          {mode === "signup" && (
            <input
              type="text"
              placeholder="Username"
              name="name"
              value={form.name}
              onChange={onChange}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={form.email}
            onChange={onChange}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={form.password}
            onChange={onChange}
          />
        </div>

        {mode === "signup" ? (
          <button onClick={handleSignup}>Continue</button>
        ) : (
          <button onClick={handleLogin}>Sign Up</button>
        )}

        <p className="loginsignup-login">
          {mode === "signup" ? "Already have an account?" : "Don't have an account?"}
          <span onClick={() => setMode(mode === "signup" ? "login" : "signup")}>
            {mode === "signup" ? "Login Here" : "Sign Up Here"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default memo(LoginSignup);
