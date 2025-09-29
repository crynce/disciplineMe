import { useState } from "react";
import "./App.css";
import FormStep2 from "./components/FormStep2";
import LoginForm from "./components/LoginForm";
import Calendar from "./components/Calendar";

function App() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  function handleDropdownToggle() {
    setDropdownVisible((prev) => !prev);
  }
  return (
    <>
      <div className="app-container ">
        {/* <LoginForm /> */}
        {/* <FormStep2 /> */}
        <Calendar />
      </div>
    </>
  );
}

export default App;
