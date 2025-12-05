import React, { useEffect, useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email] = useState(localStorage.getItem("email") || "");
  const [phone, setPhone] = useState(localStorage.getItem("phone") || "");
  const [image, setImage] = useState(localStorage.getItem("profilePic") || "");

  // Convert image → Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      localStorage.setItem("profilePic", reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const saveProfile = () => {
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    alert("Profile Updated!");
  };

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>

      <div className="profile-card">

        {/* Profile Image */}
        <label className="profile-label">Profile Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {image && (
          <img src={image} alt="profile" className="profile-image-preview" />
        )}

        {/* Name */}
        <label className="profile-label">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email (read-only) */}
        <label className="profile-label">Email</label>
        <input type="text" value={email} readOnly />

        {/* Phone */}
        <label className="profile-label">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button onClick={saveProfile} className="save-btn">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Profile;
