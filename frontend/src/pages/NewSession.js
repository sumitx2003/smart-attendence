import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import "../styles/NewSession.css";

const NewSession = ({ togglePopup, updateList }) => {
  const token = localStorage.getItem("token");
  const [qrToggle, setQrToggle] = useState(false);
  const [qrData, setQrData] = useState("");

  const createQR = async (e) => {
    e.preventDefault();

    // UUID
    const uuid = () =>
      "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });

    let session_id = uuid();
    let name = e.target.name.value;
    let date = e.target.date.value;
    let total_students = e.target.total_students.value;

    let location = "";

    if (!name || !date || !total_students) {
      alert("Please fill all fields");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        location = `${latitude},${longitude}`;

        const formData = {
          token,
          session_id,
          name,
          date,
          total_students,
          location,
        };

        try {
          const response = await axios.post(
            "http://localhost:5000/sessions/create",
            formData
          );

          setQrData(response.data.url);
          setQrToggle(true);
          updateList();
        } catch (err) {
          console.log(err);
        }
      }
    );
  };

  return (
    <div className="new-popup">
      <button onClick={togglePopup}>
        <strong>X</strong>
      </button>

      {!qrToggle ? (
        <div className="popup-inner">
          <h5>Create a New Session</h5>
          <form onSubmit={createQR}>
            <input type="text" name="name" placeholder="Session Name" />

            <input type="date" name="date" />

            <input
              type="number"
              name="total_students"
              placeholder="Total Students"
            />

            <button type="submit">Create Session</button>
          </form>
        </div>
      ) : (
        <div className="qr-code">
          <QRCode value={qrData} size={200} />
          <button onClick={() => navigator.clipboard.writeText(qrData)}>
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default NewSession;
