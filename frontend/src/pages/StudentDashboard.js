import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
import DashboardLayout from "./DashboardLayout";

const queryParameters = new URLSearchParams(window.location.search);

const StudentDashboard = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const [sessionList, setSessionList] = useState([]);
  const [isSessionDisplay, setSessionDisplay] = useState(false);
  const navigate = useNavigate();

  // Fetch student sessions
  const getStudentSessions = () => {
    axios
      .post("http://localhost:5000/sessions/getStudentSessions", { token })
      .then((response) => setSessionList(response.data.sessions || []))
      .catch((error) => console.error("Error fetching sessions:", error));
  };

  // Toggle student attendance popup
  const toggleStudentForm = (action) => {
    if (action === "open") {
      setSessionDisplay(true);
    } else {
      localStorage.removeItem("session_id");
      localStorage.removeItem("teacher_email");
      setSessionDisplay(false);
      navigate("/student-dashboard");
    }
  };

  const getDistance = (distance, radius) => ({
    distance,
    color: distance <= parseFloat(radius) ? "green" : "red",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      getStudentSessions();

      try {
        if (queryParameters.get("session_id") && queryParameters.get("email")) {
          localStorage.setItem("session_id", queryParameters.get("session_id"));
          localStorage.setItem("teacher_email", queryParameters.get("email"));
        }

        if (
          !localStorage.getItem("session_id") ||
          !localStorage.getItem("teacher_email")
        ) {
          toggleStudentForm("close");
        } else {
          toggleStudentForm("open");
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [token, navigate]);

  return (
    <DashboardLayout title="Student Dashboard">
      <div className="student-dashboard-content">
        {!isSessionDisplay && (
          <>
            <div className="session-header">
              <h2>Your Attendance Records</h2>
            </div>

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
                    {sessionList.map((session, index) => (
                      <tr key={index} className="session-row">
                        <td>{session.name}</td>
                        <td>{session.date.split("T")[0]}</td>
                        <td>{session.time}</td>
                        <td>{session.duration}</td>
                        <td
                          style={{
                            color: getDistance(
                              session.distance,
                              session.radius
                            ).color,
                          }}
                        >
                          {getDistance(session.distance, session.radius)
                            .distance || "N/A"}
                        </td>
                        <td>
                          <img
                            src={session.image}
                            alt="session"
                            className="session-image"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="empty-text">
                  No attendance records yet. Attend a session to get started!
                </p>
              )}
            </div>
          </>
        )}

        {isSessionDisplay && (
          <div className="popup-overlay">
            <StudentForm togglePopup={toggleStudentForm} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
