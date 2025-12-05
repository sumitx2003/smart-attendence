import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import NewSession from "./NewSession";
import SessionDetails from "./SessionDetails";
import DashboardLayout from "./DashboardLayout";

const TeacherDashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [sessionList, setSessionList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSessionDetailsOpen, setIsSessionDetailsOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const updateList = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/sessions/getSessions",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSessionList(response.data.sessions || []);
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const togglePopup = () => setIsPopupOpen(prev => !prev);

  const openSessionDetails = (sessionId) => {
    const selected = sessionList.find(s => s.session_id === sessionId);
    setCurrentSession(selected);
    setIsSessionDetailsOpen(true);
  };

  const closeSessionDetails = () => {
    setIsSessionDetailsOpen(false);
    setCurrentSession(null);
  };

  useEffect(() => {
    if (!token) navigate("/login");
    else updateList();
  }, [token]);

  // -------------------------
  // 📌 REAL STATS
  // -------------------------
  const totalSessions = sessionList.length;

  // count all attendance records
  const totalStudentsAttended = sessionList.reduce(
    (sum, session) => sum + (session.attendance?.length || 0),
    0
  );

  // count expected students (from total_students field)
  const totalExpected = sessionList.reduce(
    (sum, session) => sum + Number(session.total_students || 0),
    0
  );

  const avgAttendance =
    totalExpected > 0
      ? Math.round((totalStudentsAttended / totalExpected) * 100)
      : 0;

  return (
    <DashboardLayout title="Teacher Dashboard">

      {/* Stats */}
      <div className="dashboard-widgets">
        <div className="widget-card">
          <h3>Total Sessions</h3>
          <p>{totalSessions}</p>
        </div>

        <div className="widget-card">
          <h3>Students Attended</h3>
          <p>{totalStudentsAttended}</p>
        </div>

        <div className="widget-card">
          <h3>Average Attendance</h3>
          <p>{avgAttendance}%</p>
        </div>
      </div>

      {/* Session List */}
      <div className="session-section">
        <div className="session-header">
          <h2>Your Sessions</h2>
          <button className="createbtn" onClick={togglePopup}>
            + Create Session
          </button>
        </div>

        <div className="session-grid">
          {sessionList.length > 0 ? (
            sessionList.map((session, index) => (
              <div
                key={index}
                className="session-card"
                onClick={() => openSessionDetails(session.session_id)}
              >
                <h3>{session.name}</h3>
                <p>{session.date.split("T")[0]}</p>
              </div>
            ))
          ) : (
            <p className="empty-text">No sessions found. Create one!</p>
          )}
        </div>
      </div>

      {/* Session Details Popup */}
      {isSessionDetailsOpen && currentSession && (
        <div className="popup-overlay">
          <SessionDetails
            currentSession={currentSession}
            closeSession={closeSessionDetails}
          />
        </div>
      )}

      {/* Create Session Popup */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <NewSession togglePopup={togglePopup} updateList={updateList} />
        </div>
      )}
    </DashboardLayout>
  );
};

export default TeacherDashboard;
