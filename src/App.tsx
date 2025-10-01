// import { useState } from "react";
import "./App.css";
// import FormStep2 from "./components/FormStep2";
// import LoginForm from "./components/LoginForm";
// import Calendar from "./components/Calendar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CalendarDashboard from "./components/CalendarDashboard";
import LoginForm from "./components/LoginForm";

function App() {
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  // function handleDropdownToggle() {
  //   setDropdownVisible((prev) => !prev);
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<CalendarDashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
