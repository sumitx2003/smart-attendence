import mongoose from "mongoose";
const schema = mongoose.Schema;

const attendanceSchema = new schema({
  regno: { type: String, required: true },
  image: { type: String, required: true },
  IP: { type: String, required: true },
  date: { type: String, required: true },
  student_email: { type: String, required: true },
  Location: { type: String, required: true },
  distance: { type: String, required: true },
});

const sessionSchema = new schema({
  session_id: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  radius: { type: String, required: true },
  attendance: [attendanceSchema],
});

const teacherSchema = new schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    pno: { type: String, required: true },
    dob: { type: String, required: true },
    password: { type: String, required: true },
    sessions: [sessionSchema],
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("teacher", teacherSchema);
