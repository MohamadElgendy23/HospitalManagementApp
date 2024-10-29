import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Doctor.css";

const API = "http://localhost:4000/doctors/";
function Doctor() {
  const [name, setName] = useState("");
  const [patients, setPatients] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(API);
        const data = response.data;
        setDoctors(data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  function clearInput() {
    setName("");
    setPatients("");
  }

  async function editDoctor(id) {
    const findDoctor = doctors.find((doctor) => doctor._id === id);
    setEditingDoctor(findDoctor);
    setName(findDoctor.name);
    setPatients(findDoctor.patients);

    try {
      await axios.put(API + id, {
        name: name,
        patients: patients,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedDoctors = doctors.filter((doctor) =>
        doctor._id === id ? editingDoctor : doctor
      );
      setDoctors(updatedDoctors);
      setEditingDoctor(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteDoctor(id) {
    try {
      await axios.delete(API + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedDoctors = doctors.filter((doctor) => doctor._id !== id);
      setDoctors(updatedDoctors);
    } catch (error) {
      console.error(error);
    }
  }

  async function formSubmit() {
    try {
      const response = await axios.post(
        API,
        {
          name: name,
          patients: patients,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setDoctors([...doctors, data]);
      clearInput();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container">
      <h1>Hospital Management App</h1>
      <nav className="navbar navbar-inverse bg-light">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
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
            {editingDoctor ? "Edit Doctor" : "Add New Doctor"}
          </h4>
          <div className="form-group">
            <label htmlFor="nameInput">Name: </label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              aria-describedby="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="patientsInput">
              Patients (Seperate by comma):{" "}
            </label>
            <input
              type="text"
              className="form-control"
              id="patientsInput"
              aria-describedby="patients"
              value={patients}
              onChange={(e) => setPatients(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={formSubmit}
          >
            Submit
          </button>
        </form>
        <div className="container">
          <h4 className="center">
            Doctors (
            <span id="num-doctors">
              {doctors.length > 0 ? doctors.length : "None"}
            </span>
            )
          </h4>
          {doctors?.map((doctor, key) => (
            <div className="container" id="doctor-container" key={key}>
              <div className="container-fluid">
                <h3>{doctor.name}</h3>
              </div>
              <div className="container-fluid">
                <p>Patients: {doctor.patients}</p>
              </div>
              <div className="container" id="extra-button-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editDoctor(doctor._id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn
                  btn-primary"
                  onClick={() => deleteDoctor(doctor._id)}
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

export default Doctor;
