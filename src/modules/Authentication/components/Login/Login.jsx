import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usersUrls } from "../../../../constans/END_POINTS";

export default function Login({ saveUserData, userData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(usersUrls.login, data);
      localStorage.setItem("userToken", response.data.token);
      saveUserData();
      navigate("/dashboard");
      toast.success("Login successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <h4 className="fw-bold">Log In</h4>
      <p className="text-muted">Welcome Back! Please enter your details</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup mb-3">
          <div className="input-group my-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-mobile-screen"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="Enter your E-mail"
              aria-label="email"
              aria-describedby="basic-addon1"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
          </div>
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </div>

        <div className="inputGroup mb-3">
          <div className="input-group my-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-1 border-end-0"
              placeholder="password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/,
                  message:
                    "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <button
              type="button"
              className="input-group-text bg-transparent "
              onClick={togglePasswordVisibility}
              onMouseDown={(e) => e.preventDefault()}
              onMouseUp={(e) => e.preventDefault()}
            >
              <span className="sr-only">
                {showPassword ? "hide password" : "show password"}
              </span>
              <i
                className={
                  showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }
              ></i>
            </button>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="login-links d-flex justify-content-between my-2">
          <Link className="text-decoration-none text-dark">Register Now?</Link>
          <Link
            to="/forget-password"
            className="text-decoration-none text-success"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          className="btn btn-success w-100 mt-3"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <span>
              please wait...{" "}
              <i className="fa-solid fa-spinner fa-spin mx-1"></i>
            </span>
          ) : (
            "login"
          )}
        </button>
      </form>
    </>
  );
}
