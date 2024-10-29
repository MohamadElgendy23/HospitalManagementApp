import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoPage from "./pages/nopagePage/NoPage.js";
import Appointment from "./pages/appointmentPage/Appointment.js";
import Doctor from "./pages/doctorPage/Doctor.js";
import Patient from "./pages/patientPage/Patient.js";
import Login from "./pages/loginPage/Login.js";
import SignUp from "./pages/SignUpPage/SignUp.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Patient />} />
        {/* <Route path="/register" element={<SignUp />} /> */}
        {/* <Route path="/patients" element={<Patient />} /> */}
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
