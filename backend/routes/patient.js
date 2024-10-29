const express = require("express");
const patientRouter = express.Router();
const Patient = require("../models/Patient.js");

patientRouter.get("/", async (req, res) => {
  try {
    const allData = await Patient.find();
    res.json(allData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

patientRouter.post("/", async (req, res) => {
  const newData = new Patient(req.body);
  try {
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

patientRouter.put("/:id", async (req, res) => {
  try {
    const updatedData = await Patient.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

patientRouter.delete("/:id", async (req, res) => {
  try {
    const removedData = await Patient.deleteOne({ _id: req.params.id });
    res.json(removedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = patientRouter;
