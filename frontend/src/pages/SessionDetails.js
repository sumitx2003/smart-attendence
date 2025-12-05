import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/SessionDetails.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SessionDetails = ({ currentSession, closeSession }) => {
  const [qr, setQR] = useState("");
  const token = localStorage.getItem("token");

  const getQR = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/sessions/getQR",
        { session_id: currentSession.session_id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setQR(res.data.qrImage);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadQR = () => {
    const a = document.createElement("a");
    a.href = qr;
    a.download = `qr_${currentSession.session_id}.png`;
    a.click();
  };

  useEffect(() => {
    getQR();
  }, []);

  return (
    <div className="popup">
      <button onClick={closeSession} className="close-btn">
        <strong>X</strong>
      </button>

      <div className="popup-inner">
        <div className="popup-content">
          <div className="session-details">
            <p>
              <strong>Name: </strong> {currentSession.name}
            </p>
            <p>
              <strong>Date: </strong> {currentSession.date.split("T")[0]}
            </p>
          </div>

          <div className="qr-code">
            {qr && <img src={qr} alt="QR" width={200} />}
            <button className="copybtn" onClick={downloadQR}>
              Download QR
            </button>
          </div>
        </div>

        {/* Attendance Table */}
        <div className="student-list">
          <p>
            <strong>Students Attended:</strong>
          </p>

          <table id="attendance-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {currentSession.attendance?.length > 0 ? (
                currentSession.attendance.map((s, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{s.regno}</td>
                    <td>{s.student_name}</td>
                    <td>{s.student_email}</td>
                    <td>{s.date.split("T")[0]}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No students yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SessionDetails;
