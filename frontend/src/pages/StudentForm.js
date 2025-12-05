import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import DashboardLayout from "./DashboardLayout";

const StudentDashboard = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const [sessionList, setSessionList] = useState([]);
  const [isSessionDisplay, setSessionDisplay] = useState(false);

  const navigate = useNavigate();

  // Fetch sessions from backend
  const getStudentSessions = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/sessions/getStudentSessions",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSessionList(res.data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const toggleStudentForm = (action) => {
    if (action === "open") {
      setSessionDisplay(true);
    } else {
      localStorage.removeItem("session_id");
      localStorage.removeItem("teacher_email");
      setSessionDisplay(false);
    }
  };

  const getDistance = (distance, radius) => {
    if (!distance || !radius) {
      return { distance: "N/A", color: "black" };
    }
    return {
      distance,
      color: parseFloat(distance) <= parseFloat(radius) ? "green" : "red",
    };
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    getStudentSessions();

    // Handle QR scan
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get("session_id");
    const teacher_email = params.get("email");

    if (session_id && teacher_email) {
      localStorage.setItem("session_id", session_id);
      localStorage.setItem("teacher_email", teacher_email);
      toggleStudentForm("open");
    }
  }, [token]); // ❌ no navigate dependency → avoids re-render loops

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="student-dashboard-content">

        {/* Attendance form popup */}
        {isSessionDisplay && (
          <div className="popup-overlay">
            <StudentForm togglePopup={toggleStudentForm} />
          </div>
        )}

        {/* Main dashboard */}
        {!isSessionDisplay && (
          <>
            <h2>Your Attendance Records</h2>

            <div className="session-table-container">
              {sessionList.length > 0 ? (
                <table className="session-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Duration</th>
                      <th>Distance</th>
                      <th>Image</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionList.map((session, index) => {
                      const dist = getDistance(session.distance, session.radius);

                      return (
                        <tr key={index}>
                          <td>{session.name}</td>
                          <td>{session.date?.split("T")[0] || "N/A"}</td>
                          <td>{session.time}</td>
                          <td>{session.duration}</td>

                          <td style={{ color: dist.color }}>{dist.distance}</td>

                          <td>
                            <img
                              src={session.image}
                              alt="session"
                              className="session-image"
                            />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="empty-text">
                  No attendance yet. Scan QR to mark attendance!
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
