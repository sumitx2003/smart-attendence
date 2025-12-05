import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { Student } from "../model/Student.js";
import { Teacher } from "../model/Teacher.js";
import JWT from "../middleware/JWT.js";

// ------------------------------
// LOGIN
// ------------------------------
async function Login(req, res) {
  const { email, password } = req.body;

  // find in student or teacher
  let type = "student";
  let user = await Student.findOne({ email });

  if (!user) {
    type = "teacher";
    user = await Teacher.findOne({ email });
  }

  if (!user) return res.status(400).json({ message: "No such user" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid password" });

  const token = JWT.generateToken({ email: user.email, type });

  // return CLEAN user (never return password)
  const safeUser = {
    name: user.name,
    email: user.email,
    pno: user.pno,
    dob: user.dob,
  };

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
  });

  return res.status(200).json({
    message: "Login successful",
    user: safeUser,
    type,
    token,
  });
}

// ------------------------------
// SIGNUP
// ------------------------------
async function Signup(req, res) {
  const { name, email, pno, dob, password, type } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const Model = type === "teacher" ? Teacher : Student;

    const exists = await Model.findOne({ email });
    if (exists) return res.status(400).json({ message: "User already exists" });

    const created = await Model.create({
      name,
      email,
      pno,
      dob,
      password: hashed,
    });

    return res.status(201).json({ message: "Registration successful", user: created });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// ------------------------------
// FORGOT PASSWORD
// ------------------------------
async function ForgotPassword(req, res) {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  let user = await Student.findOneAndUpdate(
    { email },
    { password: hashed }
  );

  if (!user) {
    user = await Teacher.findOneAndUpdate(
      { email },
      { password: hashed }
    );
  }

  if (user) return res.status(200).json({ message: "Password reset successful" });

  return res.status(400).json({ message: "No such user" });
}

export default { Login, Signup, ForgotPassword };
