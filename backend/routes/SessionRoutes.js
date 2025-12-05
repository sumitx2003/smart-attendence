import { Router } from "express";
const router = Router();
import upload from "../middleware/Multer.js";
import SessionController from "../controllers/SessionController.js";
import JWT from "../middleware/JWT.js";

// Create session
router.post(
  "/create",
  JWT.verifyToken,
  SessionController.CreateNewSession
);

// Get all teacher sessions
router.post(
  "/getSessions",
  JWT.verifyToken,
  SessionController.GetAllTeacherSessions
);

// Get QR for a session
router.post(
  "/getQR",
  JWT.verifyToken,
  SessionController.GetQR
);

// Attend a session
router.post(
  "/attend_session",
  JWT.verifyToken,
  upload.single("image"),
  SessionController.AttendSession
);

// Get sessions for student
router.post(
  "/getStudentSessions",
  JWT.verifyToken,
  SessionController.GetStudentSessions
);

export default router;
