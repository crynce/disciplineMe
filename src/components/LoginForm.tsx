import { useState } from "react";
import type { formSelectType, loginFormDataType } from "../types/loginForm";
import { inititalLoginFormData } from "../const/const";

export default function LoginForm() {
  const html = (
    <form onSubmit={handleSubmit} className="login-form">
      <label htmlFor="email" className="login-form-input-labels">
        Email:
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        className="login-form-input-fields"
      />
      <label htmlFor="password" className="login-form-input-labels">
        {" "}
        Password:
      </label>
      <input
        className="login-form-input-fields"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
      />
      <input
        id="rememberme"
        type="checkbox"
        name="checkbox"
        className="login-form-input-fields"
      />
      <label htmlFor="rememberme" className="login-form-input-labels">
        Remember me
      </label>

      <button>Login</button>
    </form>
  );
  const [formData, setFormData] = useState<loginFormDataType>(
    inititalLoginFormData
  );

  const [selectForm, setSelectForm] = useState<formSelectType>("loginForm");
  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData, "--", e.target.formdata, "formData");
    const data = Object.fromEntries(formData);
    setFormData((prev) => ({ ...prev, ...data }));
  }

  function handleFormSelect(val: formSelectType) {
    setSelectForm(val);
    return;
  }
  return (
    <div className="login-register-form-container">
      <div className="form-selection">
        <span
          onClick={() => handleFormSelect("loginForm")}
          className={selectForm == "loginForm" ? "form-Selected" : ""}
        >
          Login
        </span>
        <span
          onClick={() => handleFormSelect("registerForm")}
          className={selectForm == "registerForm" ? "form-selected" : ""}
        >
          Register
        </span>
      </div>
      <div className="login-form-container">{html}</div>
    </div>
  );
}
