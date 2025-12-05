import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import see from "../assets/see.png";
import hide from "../assets/hide.png";

axios.defaults.withCredentials = true;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/users/signin", {
        email,
        password,
      });

      const { user, type, token } = res.data;

      // Save to local storage
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.name);
      localStorage.setItem("pno", user.pno);
      localStorage.setItem("dob", user.dob);
      localStorage.setItem("type", type);
      localStorage.setItem("token", token);

      if (type === "teacher") navigate("/teacher-dashboard");
      else navigate("/student-dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img alt="Full" src={image512} />
      </div>

      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img alt="logo" src={image192} />
          </div>

          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please log in</p>

            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />

              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ padding: 0 }}
                >
                  <img src={showPassword ? hide : see} alt="toggle" />
                </button>
              </div>

              <div className="login-center-options">
                <a href="/forgot-password" style={{ color: "#76ABAE" }}>
                  Forgot password?
                </a>
              </div>

              <div className="login-center-buttons">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: "#76ABAE" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
