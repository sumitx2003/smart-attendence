import dotenv from "dotenv";
dotenv.config();
import querystring from "querystring";
import QRCode from "qrcode";
import { Teacher } from "../model/Teacher.js";
import { Student } from "../model/Student.js";
import uploadImage from "../middleware/Cloudinary.js";

// ------------------------------
// QR GENERATION
// ------------------------------
function buildQR(session_id, email) {
  const qrUrl = `${process.env.CLIENT_URL}/student-dashboard?${querystring.stringify({
    session_id,
    email,
  })}`;

  return QRCode.toDataURL(qrUrl);
}

// ------------------------------
// DISTANCE CHECK
// ------------------------------
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function checkDistance(loc1, loc2) {
  const [lat1, lon1] = loc1.split(",").map(Number);
  const [lat2, lon2] = loc2.split(",").map(Number);
  return haversine(lat1, lon1, lat2, lon2).toFixed(2);
}

// ------------------------------
// CREATE SESSION
// ------------------------------
async function CreateNewSession(req, res) {
  const tokenData = req.user;
  const { session_id, name, duration, location, radius, date, time } = req.body;

  const session = {
    session_id,
    name,
    duration,
    location,
    radius,
    date,
    time,
    attendance: [],
  };

  try {
    const teacher = await Teacher.findOneAndUpdate(
      { email: tokenData.email },
      { $push: { sessions: session } },
      { new: true }
    );

    const qrImage = await buildQR(session_id, teacher.email);

    return res.status(200).json({
      message: "Session created successfully",
      qrImage,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// ------------------------------
// GET ALL TEACHER SESSIONS
// ------------------------------
async function GetAllTeacherSessions(req, res) {
  try {
    const teacher = await Teacher.findOne({ email: req.user.email });
    return res.status(200).json({ sessions: teacher.sessions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// ------------------------------
// GET QR FOR SESSION
// ------------------------------
async function GetQR(req, res) {
  try {
    const qrImage = await buildQR(req.body.session_id, req.user.email);
    return res.status(200).json({ qrImage });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// ------------------------------
// ATTEND SESSION
// ------------------------------
async function AttendSession(req, res) {
  const { session_id, teacher_email, regno, IP, student_email, Location, date } = req.body;

  try {
    const teacher = await Teacher.findOne({ email: teacher_email });

    const session = teacher.sessions.find(s => s.session_id === session_id);
    if (!session) return res.status(400).json({ message: "Session not found" });

    const already = session.attendance.find(
      s => s.regno === regno || s.student_email === student_email
    );

    if (already)
      return res.status(200).json({ message: "Attendance already marked" });

    const dist = checkDistance(Location, session.location);
    const imagePath = await uploadImage(req.file.filename);

    session.attendance.push({
      regno,
      image: imagePath,
      date,
      IP,
      student_email,
      Location,
      distance: dist,
    });

    await teacher.save();

    await Student.findOneAndUpdate(
      { email: student_email },
      {
        $push: {
          sessions: {
            session_id,
            teacher_email,
            name: session.name,
            date: session.date,
            time: session.time,
            duration: session.duration,
            distance: dist,
            radius: session.radius,
            image: imagePath,
          },
        },
      }
    );

    return res.status(200).json({ message: "Attendance marked successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// ------------------------------
// STUDENT SESSION LIST
// ------------------------------
async function GetStudentSessions(req, res) {
  try {
    const student = await Student.findOne({ email: req.user.email });
    res.status(200).json({ sessions: student.sessions });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export default {
  CreateNewSession,
  GetAllTeacherSessions,
  GetQR,
  AttendSession,
  GetStudentSessions,
};
