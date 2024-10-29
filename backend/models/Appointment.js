const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true,
    ref: "Patient",
  },
  doctor: {
    type: String,
    required: true,
    ref: "Doctor",
  },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, required: true },
});

const Appointment = new mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
