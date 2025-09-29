// import { useState } from "react";
import "./App.css";
// import FormStep2 from "./components/FormStep2";
// import LoginForm from "./components/LoginForm";
// import Calendar from "./components/Calendar";
import CalendarDashboard from "./components/CalendarDashboard";

function App() {
  // const [dropdownVisible, setDropdownVisible] = useState(false);
  // function handleDropdownToggle() {
  //   setDropdownVisible((prev) => !prev);
  // }
  return (
    <>
      <div className="app-container ">
        {/* <LoginForm /> */}
        {/* <FormStep2 /> */}
        {/* <Calendar /> */}
        <CalendarDashboard />
      </div>
    </>
  );
}

export default App;
