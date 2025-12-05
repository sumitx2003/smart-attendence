import React, { useState } from "react";
import "../styles/About.css";

import signup from "../assets/Signup.png";
import login from "../assets/Login.png";
import teacherd from "../assets/Teacher Dashboard.png";
import teacherd2 from "../assets/Teacher Dashboard 2.png";
import studentd from "../assets/student dashboard.png";
import studentd2 from "../assets/student dashboard 2.png";
import forgorPW from "../assets/Forgot pw.png";
import qr from "../assets/QR.png";
import newSession from "../assets/New Session.png";
import attendance from "../assets/attendance given.png";
import sessionInfo from "../assets/Session Info.png";
import next from "../assets/next.png";
import prev from "../assets/previous.png";
import submitAttendance from "../assets/submit attendance.png";

const assets = [
  {
    image_url: signup,
    title: "Signup",
    caption:
      "Users sign up as teacher or student and receive an OTP to verify account."
  },
  {
    image_url: login,
    title: "Login",
    caption:
      "User logs in using email and password. A JWT token is generated."
  },
  {
    image_url: teacherd,
    title: "Teacher Dashboard",
    caption:
      "Shows all previous sessions with ability to create new attendance session."
  },
  {
    image_url: newSession,
    title: "Create Session",
    caption:
      "Teacher sets session name, time, location, and allowed distance."
  },
  {
    image_url: qr,
    title: "QR Generated",
    caption:
      "A unique QR code is generated for each session."
  },
  {
    image_url: teacherd2,
    title: "Dashboard Updated",
    caption: "New session appears in dashboard."
  },
  {
    image_url: studentd,
    title: "Student Dashboard",
    caption: "Student sees past attendance records."
  },
  {
    image_url: submitAttendance,
    title: "Submit Attendance",
    caption:
      "Student scans QR, enters roll number, and uploads a photo."
  },
  {
    image_url: attendance,
    title: "Attendance Success",
    caption: "Attendance submitted successfully."
  },
  {
    image_url: studentd2,
    title: "Updated Dashboard",
    caption: "Student dashboard updates with new attendance."
  },
  {
    image_url: sessionInfo,
    title: "Session Info",
    caption:
      "Teacher sees session data with QR, attendance list, images, and distances."
  },
  {
    image_url: forgorPW,
    title: "Forgot Password",
    caption:
      "User resets password using OTP sent to email."
  }
];

const About = ({ toggleDone }) => {
  const [active, setActive] = useState(0);

  const onNext = () => {
    if (active < assets.length - 1) setActive(active + 1);
    else toggleDone();
  };

  const onPrev = () => {
    if (active > 0) setActive(active - 1);
  };

  const Slide = ({ image_url, title, caption, active }) => {
    const [hover, setHover] = useState(false);

    return (
      <div className={`slide ${active ? "active" : ""}`}>
        <img
          src={image_url}
          alt={caption}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />

        {hover && (
          <span
            className="caption"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <h3>{title}</h3>
            <p>{caption}</p>
          </span>
        )}
      </div>
    );
  };

  return (
    <div className="slider">
      <h2>Tutorial</h2>

      <div className="slides">
        {assets.map((e, i) => (
          <Slide key={i} {...e} active={i === active} />
        ))}
      </div>

      <div className="navigation">
        <div className="navigation-bottom">
          {assets.map((e, i) => (
            <button
              key={i}
              className={`preview ${i === active ? "active" : ""}`}
              onMouseEnter={() => setActive(i)}
            />
          ))}
        </div>

        <div className="navigation-next-prev">
          <div className="next-prev prev" onClick={onPrev}>
            <img src={prev} alt="<" />
          </div>

          <div className="next-prev next" onClick={onNext}>
            <img src={next} alt=">" />
          </div>
        </div>
      </div>

      <button className="skipbtn" onClick={toggleDone}>
        Skip
      </button>
    </div>
  );
};

export default About;
