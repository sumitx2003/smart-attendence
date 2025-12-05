import React, { useState, useEffect } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import see from "../assets/see.png";
import hide from "../assets/hide.png";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const dob = e.target.dob.value;
    const pno = e.target.pno.value;
    const email = e.target.email.value;
    const type = e.target.type.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!name || !email || !password || !confirmPassword || !dob || !pno) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:5000/users/signup", {
        name,
        email,
        password,
        pno,
        dob,
        type,
      });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Error during signup");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/dashboard");
  }, [navigate]);

  return (
    <div className="register-main">
      <div className="register-left">
        <img alt="Full" src={image512} />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img alt="logo" src={image192} />
          </div>
          <div className="register-center">
            <h2>Welcome!</h2>
            <p>Please register below</p>
            <form onSubmit={handleRegisterSubmit}>
              <select name="type" id="type">
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
              <input type="text" placeholder="Name" name="name" />
              <input type="email" placeholder="Email" name="email" />
              <input type="text" placeholder="Phone Number" name="pno" />
              <input type="date" name="dob" />
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
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
              </div>
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#76ABAE" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};


export default Signup;
