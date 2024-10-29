const express = require("express");
const appointmentRouter = express.Router();
const Appointment = require("../models/Appointment.js");

appointmentRouter.get("/", async (req, res) => {
  try {
    const allData = await Appointment.find();
    res.json(allData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

appointmentRouter.post("/", async (req, res) => {
  const newData = new Appointment(req.body);
  try {
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

appointmentRouter.put("/:id", async (req, res) => {
  try {
    const updatedData = await Appointment.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

appointmentRouter.delete("/:id", async (req, res) => {
  try {
    const removedData = await Appointment.deleteOne({ _id: req.params.id });
    res.json(removedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = appointmentRouter;
