import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LoginForm from "./components/loginForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>Discipline.me</div>
      <LoginForm />
    </>
  );
}

export default App;
