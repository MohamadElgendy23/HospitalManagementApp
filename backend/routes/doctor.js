const express = require("express");
const doctorRouter = express.Router();
const Doctor = require("../models/Doctor.js");

doctorRouter.get("/", async (req, res) => {
  try {
    const allData = await Doctor.find();
    res.json(allData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

doctorRouter.post("/", async (req, res) => {
  const newData = new Doctor(req.body);
  try {
    const savedData = await newData.save();
    res.json(savedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

doctorRouter.put("/:id", async (req, res) => {
  try {
    const updatedData = await Doctor.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.json(updatedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

doctorRouter.delete("/:id", async (req, res) => {
  try {
    const removedData = await Doctor.deleteOne({ _id: req.params.id });
    res.json(removedData);
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = doctorRouter;
