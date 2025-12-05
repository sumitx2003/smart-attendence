import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../styles/AttendanceReport.css";

const AttendanceReport = () => {
  // 🔥 Correct: flat array (not array inside array)
  const [combinedData, setCombinedData] = useState([]);

  // 🔥 Fake data (insert ANY students here)
  const fakeData = [
    { name: "ANKIT KUMAR", id: "2021UCP1053", email: "2021UCP1053@mnit.ac.in", attendance: 78 },
    { name: "PARINEETA SONI", id: "2023UCP1127", email: "2023UCP1127@mnit.ac.in", attendance: 63 },
    { name: "DHRUV BANSAL", id: "2023UCP1570", email: "2023UCP1570@mnit.ac.in", attendance: 85 },
    { name: "YASH KUMAR JAIN", id: "2023UCP1571", email: "2023UCP1571@mnit.ac.in", attendance: 41 },
    { name: "VANSH KHATRI", id: "2023UCP1573", email: "2023UCP1573@mnit.ac.in", attendance: 92 },
    { name: "AYUSH MANOJBHAI", id: "2023UCP1574", email: "2023UCP1574@mnit.ac.in", attendance: 57 },
    { name: "NAKSHATRA BANSAL", id: "2023UCP1575", email: "2023UCP1575@mnit.ac.in", attendance: 69 },
    { name: "SANJEEV YADAV", id: "2023UCP1576", email: "2023UCP1576@mnit.ac.in", attendance: 88 },
    { name: "PRATYAKSH SINGH", id: "2023UCP1578", email: "2023UCP1578@mnit.ac.in", attendance: 37 },
    { name: "TANMAY SINGH", id: "2023UCP1579", email: "2023UCP1579@mnit.ac.in", attendance: 74 },
    { name: "PRAHLAD PRAJAPAT", id: "2023UCP1580", email: "2023UCP1580@mnit.ac.in", attendance: 61 },
    { name: "KASHVI GUPTA", id: "2023UCP1581", email: "2023UCP1581@mnit.ac.in", attendance: 82 },
    { name: "VIKAS SINGH", id: "2023UCP1582", email: "2023UCP1582@mnit.ac.in", attendance: 55 },
    { name: "MAULIK SIDANA", id: "2023UCP1583", email: "2023UCP1583@mnit.ac.in", attendance: 91 },
    { name: "VEDANT DESALE", id: "2023UCP1584", email: "2023UCP1584@mnit.ac.in", attendance: 47 },
    { name: "VANSH BANSAL", id: "2023UCP1585", email: "2023UCP1585@mnit.ac.in", attendance: 76 },
    { name: "TUSHAR AGARWAL", id: "2023UCP1586", email: "2023UCP1586@mnit.ac.in", attendance: 68 },
    { name: "MAAHIR TANEJA", id: "2023UCP1587", email: "2023UCP1587@mnit.ac.in", attendance: 39 },
    { name: "ASIT YADAV", id: "2023UCP1588", email: "2023UCP1588@mnit.ac.in", attendance: 96 }
  ];

  useEffect(() => {
    // 👉 If you want ONLY FAKE DATA, use this:
    setCombinedData(fakeData);

    // 👉 If you want to MERGE REAL DATA, call mergeStudentAttendance();
  }, []);

  // ---------------- PDF EXPORT ----------------
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Attendance Report", 70, 15);

    doc.setFontSize(12);
    doc.text(`Total Students: ${combinedData.length}`, 10, 30);

    // Table header
    doc.text("S.No", 10, 50);
    doc.text("ID", 40, 50);
    doc.text("Name", 90, 50);
    doc.text("%", 170, 50);

    let y = 60;

    combinedData.forEach((s, index) => {
      doc.text(String(index + 1), 10, y);
      doc.text(s.id, 40, y);
      doc.text(s.name, 90, y);
      doc.text(String(s.attendance), 170, y);
      y += 10;
    });

    doc.save("AttendanceReport.pdf");
  };

  return (
    <div className="report-container">
      <h1>Attendance Summary</h1>

      <div className="summary-box">
        <p><strong>Total Students:</strong> {combinedData.length}</p>
      </div>

      <h2>Attendance Table</h2>

      <table className="report-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>% Attendance</th>
          </tr>
        </thead>

        <tbody>
          {combinedData.map((s, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.attendance}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="export-btn" onClick={exportPDF}>
        Export PDF
      </button>
    </div>
  );
};

export default AttendanceReport;
