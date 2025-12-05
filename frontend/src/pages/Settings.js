import React, { useState } from "react";
import DashboardLayout from "./DashboardLayout";
import "../styles/Settings.css";

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [password, setPassword] = useState("");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  const updatePassword = () => {
    if (!password) return alert("Enter a new password!");
    alert("Password updated!");
    setPassword("");
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <DashboardLayout title="Settings">
      <div className="settings-wrapper">

        {/* Theme */}
        <section className="settings-card">
          <h2 className="section-title">Theme Settings</h2>

          <button className="btn-theme" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Switch to Dark Mode" : "☀️ Switch to Light Mode"}
          </button>
        </section>

        {/* Password Update */}
        <section className="settings-card">
          <h2 className="section-title">Change Password</h2>

          <input
            type="password"
            placeholder="Enter new password"
            className="settings-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-update" onClick={updatePassword}>
            Update Password
          </button>
        </section>

        {/* Logout */}
        <section className="settings-card">
          <h2 className="section-title">Account</h2>

          <button className="btn-logout" onClick={logout}>
            Logout
          </button>
        </section>

      </div>
    </DashboardLayout>
  );
};

export default Settings;
