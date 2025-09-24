import { useEffect, useState } from "react";
import { InitialForm } from "./InitialForm";
import type { formSelectType } from "../types/loginForm";

export default function LoginForm() {
  const [selectForm, setSelectForm] = useState<formSelectType>("loginForm");

  useEffect(() => {
    console.log(selectForm, "selectForm");
  });

  function handleFormSelect(val: formSelectType) {
    setSelectForm(val);
  }

  return (
    <div className="login-register-form-container">
      <div className="form-selection">
        <span
          onClick={() => handleFormSelect("loginForm")}
          className={`options ${selectForm == "loginForm" ? "active" : ""}`}
        >
          Login
        </span>
        <span
          onClick={() => handleFormSelect("registerForm")}
          className={`options ${selectForm == "registerForm" ? "active" : ""}`}
        >
          Register
        </span>
      </div>
      <div className="login-form-container">
        <InitialForm />
      </div>
    </div>
  );
}
