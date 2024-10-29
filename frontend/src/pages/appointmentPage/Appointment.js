import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:4000/appointments/";
function Appointment() {
  const [patient, setPatient] = useState("");
  const [doctor, setDoctor] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [message, setMessage] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(false);

  function clearInput() {
    setPatient("");
    setDoctor("");
    setDate(null);
    setTime(null);
    setMessage("");
  }

  async function formSubmit() {
    try {
      const response = await axios.post(
        API,
        {
          patient: patient,
          doctor: doctor,
          date: date,
          time: time,
          message: message,
          appointments: appointments,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setAppointments([...appointments, data]);
      clearInput();
    } catch (error) {
      console.error(error);
    }
  }

  async function editAppointment(id) {
    const findAppointment = appointments.find(
      (appointment) => appointment._id === id
    );
    setEditingAppointment(findAppointment);
    setPatient(findAppointment.patient);
    setDoctor(findAppointment.doctor);
    setDate(findAppointment.date);
    setTime(findAppointment.time);
    setMessage(findAppointment.message);
    setAppointments(findAppointment.appointments);

    try {
      await axios.put(API + id, {
        patient: patient,
        doctor: doctor,
        date: date,
        time: time,
        message: message,
        appointments: appointments,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedAppointments = appointments.filter((appointment) =>
        appointment._id === id ? editingAppointment : appointment
      );
      setAppointments(updatedAppointments);
      setEditingAppointment(null);
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteAppointment(id) {
    try {
      await axios.delete(API + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedAppointments = appointments.filter(
        (appointment) => appointment._id !== id
      );
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div class="container">
      <h1>Hospital Management App</h1>
      <nav class="navbar navbar-inverse bg-light">
        <div class="container-fluid">
          <ul class="nav navbar-nav">
            <li>
              <a href="/appointments">Appointments</a>
            </li>
            <li>
              <a href="/doctors">Doctors</a>
            </li>
            <li>
              <a href="/">Patients</a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container-md">
        <form className="form">
          <h4 className="center">
            {editAppointment ? "Edit Appointment" : "Add New Appointment"}
          </h4>
          <div className="form-group">
            <label for="patientInput">Patient: </label>
            <input
              type="text"
              class="form-control"
              id="patientInput"
              aria-describedby="patient"
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="doctorInput">Doctor: </label>
            <input
              type="text"
              class="form-control"
              id="doctorInput"
              aria-describedby="doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="dateInput">Date: </label>
            <input
              type="date"
              class="form-control"
              id="dateInput"
              aria-describedby="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="timeInput">Time: </label>
            <input
              type="time"
              class="form-control"
              id="timeInput"
              aria-describedby="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div class="form-group">
            <label for="messageInput">Message: </label>
            <input
              type="text"
              class="form-control"
              id="messageInput"
              aria-describedby="time"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="button" class="btn btn-primary" onClick={formSubmit}>
            Submit
          </button>
        </form>
        <div className="container">
          <h4 className="center">
            Appointments (
            <span id="num-appointments">
              {appointments?.length > 0 ? appointments.length : "None"}
            </span>
            )
          </h4>
          {appointments?.map((appointment, key) => (
            <div className="container" id="doctor-container" key={key}>
              <div className="container-fluid">
                <p>Patient Name: {appointment.patient}</p>
              </div>
              <div className="container-fluid">
                <p>Doctor Name: {appointment.doctor}</p>
              </div>
              <div className="container-fluid">
                <p>Date of Appointment: {appointment.date}</p>
              </div>
              <div className="container-fluid">
                <p>Time of Appointment: {appointment.time}</p>
              </div>
              <div className="container-fluid">
                <p>Message for Appointment: {appointment.message}</p>
              </div>
              <div className="container" id="extra-button-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editAppointment(appointment._id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn
                  btn-primary"
                  onClick={() => deleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appointment;
