import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export default class Mailer {
  static async sendMail(to, subject, text) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text,
      };

      // ✅ Await and return the info
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ OTP email sent:", info.response);
      return info;
    } catch (error) {
      console.error("❌ Mail sending failed:", error.message);
      return false;
    }
  }
}
