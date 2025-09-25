import { get, useForm, type SubmitHandler } from "react-hook-form";

import type { loginFormDataType } from "../types/loginForm";
import { useEffect, useState } from "react";

export const InitialForm = () => {
  const [toolTipClass, setTooltipClass] = useState({
    value: "black-tooltip",
    allErrorsCleared: false,
  });
  const {
    register,
    handleSubmit,
    getFieldState,
    formState: { errors },
  } = useForm<loginFormDataType>({
    mode: "onTouched",
  });
  // const { invalid, isDirty, isTouched, error } = getFieldState(
  //   "email",
  //   formState
  // );
  useEffect(() => {
    console.log(errors, "errors", getFieldState("email").invalid);
  });

  const onSubmit: SubmitHandler<loginFormDataType> = (
    data: loginFormDataType
  ) => {
    console.log(data);
    {
      console.log(errors, "errors");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="input-container">
        <label htmlFor="email" className="login-form-input-labels">
          Email:
        </label>
        <input
          {...register("email", {
            required: true,
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Invalid email address",
            },
          })}
          className="login-form-input-fields"
        />
        {getFieldState("email").isTouched && getFieldState("email").invalid && (
          <span
            className={`error-basic ${
              getFieldState("email").invalid ? "inValid" : "valid"
            } `}
          >
            Enter your email address
          </span>
        )}
        {!errors.email && (
          <p
            className={`error-basic ${errors.email ? "invalid" : "valid"}`}
            role="alert"
          >
            Enter Email
          </p>
        )}

        {errors.email?.type === "pattern" && (
          <p
            className={`error-basic ${errors.email ? "invalid" : "valid"}`}
            role="alert"
          >
            Invalid email address
          </p>
        )}
      </div>
      <div className="input-container ">
        <label htmlFor="password" className="login-form-input-labels">
          Password:
        </label>
        <input
          className="login-form-input-fields"
          type="password"
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Atleast 8 characters",
            },
            pattern: {
              value: /[\d\W]/,
              message: "A digit or a special character",
            },
          })}
        />

        <div className="errors">
          {errors.password?.type === "required" && (
            <p className="error-basic" role="alert">
              Password is required
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="error-basic" role="alert">
              {errors.password.message}
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p>{errors.password?.type === "pattern"}</p>
          )}
          <p className="error-basic" role="alert">
            Password is not strong enough
          </p>
        </div>
      </div>
      <div className="input-container checkbox-container">
        <input
          id="rememberme"
          {...register("rememberMe", { required: true })}
          className="login-form-input-fields login-signup-checkbox"
          type="checkbox"
        />
        {errors.password?.type === "required" && (
          <p className="error-basic" role="alert">
            Password is not strong enough
          </p>
        )}
        <label htmlFor="rememberme" className="login-form-input-labels">
          Remember me
        </label>
      </div>

      <button className="general-button" type="submit">
        Login
      </button>
    </form>
  );
};
