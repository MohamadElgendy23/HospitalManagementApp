const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  patients: { type: String, ref: "Patient" },
});

const Doctor = new mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
