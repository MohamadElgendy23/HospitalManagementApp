import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Patient.css";

const API = "http://localhost:4000/patients/";
function Patient() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(API);
        const data = response.data;
        setPatients(data);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  function clearInput() {
    setName("");
    setAge("");
    setGender("");
  }

  function validateInput(name, age, gender) {
    if (name && age && gender) {
      return true;
    }
    return false;
  }

  async function editPatient(id) {
    const findPatient = patients.find((patient) => patient._id === id);
    setEditingPatient(findPatient);
    setName(findPatient.name);
    setAge(findPatient.age);
    setGender(findPatient.gender);

    try {
      await axios.put(API + id, {
        name: name,
        age: Number(age),
        gender: gender,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPatients = patients.filter((patient) =>
        patient._id === id ? editingPatient : patient
      );
      setPatients(updatedPatients);
      setEditingPatient(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function deletePatient(id) {
    try {
      await axios.delete(API + id, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const updatedPatients = patients.filter((patient) => patient._id !== id);
      setPatients(updatedPatients);
    } catch (error) {
      console.error(error);
    }
  }

  async function formSubmit() {
    if (!validateInput(name, age, gender)) {
      alert("No field should be empty. Try again.");
      return;
    }
    try {
      const response = await axios.post(
        API,
        {
          name: name,
          age: Number(age),
          gender: gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      setPatients([...patients, data]);
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
            {editingPatient ? "Edit Patient" : "Add New Patient"}
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
            <label htmlFor="nameInput">Age: </label>
            <input
              type="text"
              className="form-control"
              id="ageInput"
              aria-describedby="name"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="genderInput">Gender: </label>
            <input
              type="text"
              className="form-control"
              id="genderInput"
              aria-describedby="name"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
            Patients (
            <span id="num-patients">
              {patients.length > 0 ? patients.length : "None"}
            </span>
            )
          </h4>
          {patients?.map((patient, key) => (
            <div className="container" id="patient-container" key={key}>
              <div className="container-fluid">
                <h3>{patient.name}</h3>
              </div>
              <div className="container-fluid">
                <p>Age: {patient.age}</p>
              </div>
              <div className="container-fluid">
                <p>Gender: {patient.gender}</p>
              </div>
              <div className="container" id="extra-button-container">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => editPatient(patient._id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn
                  btn-primary"
                  onClick={() => deletePatient(patient._id)}
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

export default Patient;
