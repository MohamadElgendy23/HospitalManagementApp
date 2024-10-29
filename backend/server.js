const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const patientRouter = require("./routes/patient");
const doctorRouter = require("./routes/doctor");
const appoinmentRouter = require("./routes/appointment");
const app = express();
const PORT = process.env.PORT || 4000;
require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.use("/patients", patientRouter);
app.use("/doctors", doctorRouter);
app.use("/appointments", appoinmentRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
