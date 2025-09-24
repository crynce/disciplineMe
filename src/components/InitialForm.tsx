import { useForm, type SubmitHandler } from "react-hook-form";

import type { formSelectType, loginFormDataType } from "../types/loginForm";

export const InitialForm = ({ initialFormData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginFormDataType>();

  const onSubmit: SubmitHandler<loginFormDataType> = (
    data: loginFormDataType
  ) => {
    console.log(data);
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
        {errors.email?.type === "required" && (
          <p className="error-basic" role="alert">
            Email is required
          </p>
        )}
      </div>
      <div className="input-container ">
        <label htmlFor="password" className="login-form-input-labels">
          Password:
        </label>
        <input
          className="login-form-input-fields"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <p className="error-basic" role="alert">
            Password is not strong enough
          </p>
        )}
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
