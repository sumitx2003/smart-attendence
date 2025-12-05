import React from "react";
import { useEffect } from "react";
import "../styles/Landing.css";
import { Link } from "react-router-dom";
import About from "./About";

const Landing = () => {
  const [Tutorial, setTutorial] = React.useState(
    localStorage.getItem("tutorial") ? false : true
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const type = localStorage.getItem("type");
      window.location.href =
        type === "teacher" ? "/teacher-dashboard" : "/student-dashboard";
    }
  }, []);

  function toggleDone() {
    setTutorial(false);
    localStorage.setItem("tutorial", false);
  }

  return (
    <div className="landing-main">
      {Tutorial ? (
        <About toggleDone={toggleDone} />
      ) : (
        <div className="landing-main">
          <h1>Landing Page</h1>
          <p>Hello and welcome!</p>
          <Link to="/login" className="landing-login-button">
            Login
          </Link>
          <Link to="/register" className="landing-register-button">
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Landing;
