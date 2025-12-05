import React from "react";
import "../styles/DashboardLayout.css";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiHome, FiSettings, FiBarChart2 } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const DashboardLayout = ({ title, children }) => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const type = localStorage.getItem("type");

  // 🔥 FIXED — Load profilePic instead of profileImage
  const profileImage = localStorage.getItem("profilePic");

  const avatarLetter = name ? name[0].toUpperCase() : "?";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="sidebar-logo">
            <MdDashboard size={26} />
            <h2>Attendo</h2>
          </div>

          <ul className="sidebar-links">
            <li onClick={() => navigate(type === "teacher" ? "/teacher-dashboard" : "/student-dashboard")}>
              <FiHome /> <span>Dashboard</span>
            </li>

            <li onClick={() => navigate("/profile")}>
              <FiUser /> <span>Profile</span>
            </li>

            <li onClick={() => navigate("/attendance-report")}>
              <FiBarChart2 /> <span>Attendance Report</span>
            </li>

            <li onClick={() => navigate("/settings")}>
              <FiSettings /> <span>Settings</span>
            </li>
          </ul>
        </div>

        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <div className="dashboard-container">
        <header className="dashboard-header">
          <h1>{title}</h1>

          <div className="user-info">

            {/* 🔥 FIXED - Show uploaded profile pic */}
            {profileImage ? (
              <img src={profileImage} alt="profile" className="avatar-image" />
            ) : (
              <div className="avatar">{avatarLetter}</div>
            )}

            <span>{name}</span>
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
