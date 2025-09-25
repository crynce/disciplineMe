import { useForm, type SubmitHandler } from "react-hook-form";

import type { loginFormDataType } from "../types/loginForm";
import { useEffect, useState } from "react";

export const InitialForm = () => {
  const [containsNum, setContainsNum] = useState(false);

  const { register, handleSubmit, getFieldState, formState, watch } =
    useForm<loginFormDataType>({
      mode: "all",
    });
  // const watchEmail = watch("email");
  const watchPassword = watch("password");
  // const { invalid, isDirty, isTouched, error } = getFieldState(
  //   "email",
  //   formState
  // );
  const {
    invalid: emailInvalid,
    isTouched: emailTouched,
    error: emailError,
    isDirty: emailDirty,
  } = getFieldState("email", formState);
  const {
    // invalid: passInvalid,
    // isTouched: passTouched,
    error: passError,
    // isDirty: passDirty,
  } = getFieldState("password", formState);
  useEffect(() => {
    console.log(emailError, "errors");
  });
  useEffect(() => {
    console.log(passError, watchPassword, "passError");
  });

  const onSubmit: SubmitHandler<loginFormDataType> = (
    data: loginFormDataType
  ) => {
    console.log(data);
  };

  console.log(watchPassword, "watchPassword");
  useEffect(() => {
    watchPassword?.split("").map((char) => {
      if (parseInt(char)) {
        if (!containsNum) {
          setContainsNum(true);
        }
      }
    });
  }, [watchPassword]);

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

        {!emailTouched && (
          <span className="error-basic">Enter your Email Address</span>
        )}
        {/* {!emailTouched && emailInvalid && (
          <span className="error-basic">Enter your email address</span>
        )} */}
        {emailTouched && emailInvalid && (
          <span
            className={`error-basic ${emailInvalid ? "invalid" : "valid"} `}
          >
            Enter valid email address
          </span>
        )}
        {emailTouched && emailDirty && !emailInvalid && (
          <span
            className={`error-basic ${
              getFieldState("email").invalid ? "invalid" : "valid"
            } `}
          >
            Email Address looks Good👍
          </span>
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

        <div className="errors-flex">
          {/* {errors.password?.type === "required" && (
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
          )} */}
          <span
            className={`error-basic ${watchPassword?.length >= 8 ? "valid" : ""}
            }`}
            role="alert"
          >
            min 8 characters
          </span>
          <span
            className={`error-basic ${containsNum ? "valid" : ""}`}
            role="alert"
          >
            A digit or a special character
          </span>
          {/* <span className="error-basic" role="alert">
            Password is not strong enough
          </span> */}
        </div>
      </div>
      <div className="input-container checkbox-container">
        <input
          id="rememberme"
          {...register("rememberMe", { required: true })}
          className="login-form-input-fields login-signup-checkbox"
          type="checkbox"
        />
        {/* {errors.password?.type === "required" && (
          <p className="error-basic" role="alert">
            Password is not strong enough
          </p>
        )} */}
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
