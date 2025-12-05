import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  let token = req.cookies.token;

  // 1️⃣ Try Authorization header
  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
    }
  }

  // 2️⃣ Try body token
  if (!token && req.body.token) {
    token = req.body.token;
  }

  if (!token) {
    return res.status(401).json({
      message: "Access Denied (No Token Provided)",
    });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

function generateToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "5h" });
}

export default {
  verifyToken,
  generateToken,
};
