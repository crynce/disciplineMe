import { useEffect, useState } from "react";
import { InitialForm } from "./InitialForm";
import type { formSelectType } from "../types/loginForm";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function LoginForm() {
  const [selectForm, setSelectForm] = useState<formSelectType>("loginForm");

  useEffect(() => {
    console.log(selectForm, "selectForm");
  });

  function handleFormSelect(val: formSelectType) {
    setSelectForm(val);
  }

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="brand">DisciplineMe</div>
        <div className="tagline">Plan your day. Own your time.</div>
      </div>
      <div className="auth-card">
        <div
          className="login-register-form-container"
          style={{
            background: "#f9fafb",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <ThemeToggle />
          </div>
          <div className="form-selection">
            <span
              onClick={() => handleFormSelect("loginForm")}
              className={`options ${selectForm == "loginForm" ? "active" : ""}`}
            >
              Login
            </span>
            <span
              onClick={() => handleFormSelect("registerForm")}
              className={`options ${
                selectForm == "registerForm" ? "active" : ""
              }`}
            >
              Register
            </span>
          </div>
          <div className="login-form-container">
            <InitialForm />
          </div>
        </div>
        <div className="auth-footer">
          <span>Forgot password?</span>
          <span>
            No account? <Link to="/login">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
