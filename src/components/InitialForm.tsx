import { useForm, type SubmitHandler } from "react-hook-form";

import type { loginFormDataType } from "../types/loginForm";
import { useEffect } from "react";

export const InitialForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormDataType>();
  useEffect(() => {
    console.log(errors, "errors");
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
          {...register("email", { required: true })}
          className="login-form-input-fields"
        />
        <p
          className={`error-basic ${errors.email ? "invalid" : "valid"}`}
          role="alert"
        >
          Enter Email
        </p>
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
