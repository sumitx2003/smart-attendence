import { Router } from "express";
const router = Router();
import UserController from "../controllers/UserController.js";

// Login
router.post("/signin", UserController.Login);

// Register
router.post("/signup", UserController.Signup);

// Forgot password
router.post("/forgotpassword", UserController.ForgotPassword);

export default router;
