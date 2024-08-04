import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usersUrls } from "../../../../constans/END_POINTS";

export default function ResetPass() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(usersUrls.reset, data);
      navigate("/login");
      toast.success("Password has been updated successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setIsLoading(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <h4 className="fw-bold">Reset Password</h4>
      <p className="text-muted">Please Enter Your OTP or Check Your Inbox</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="Email"
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
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type="text"
              className="form-control rounded-1"
              placeholder="OTP"
              aria-label="seed"
              aria-describedby="basic-addon1"
              {...register("seed", { required: "OTP is required" })}
            />
          </div>
          {errors.seed && (
            <span className="text-danger">{errors.seed.message}</span>
          )}
        </div>

        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control rounded-1 border-end-0"
              placeholder="New Password"
              aria-label="password"
              aria-describedby="basic-addon1"
              {...register("password", {
                required: "New password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/,
                  message:
                    "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              })}
            />
            <span
              className="input-group-text bg-transparent"
              onClick={togglePasswordVisibility}
            >
              <i
                className={
                  showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }
              ></i>
            </span>
          </div>
          {errors.password && (
            <span className="text-danger">{errors.password.message}</span>
          )}
        </div>

        <div className="inputGroup mb-3">
          <div className="input-group mb-1">
            <span className="input-group-text" id="basic-addon1">
              <i className="fa-solid fa-lock"></i>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control rounded-1 border-end-0"
              placeholder="Confirm New Password"
              aria-label="confirmPassword"
              aria-describedby="basic-addon1"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{4,}$/,
                  message:
                    "Password must be at least 4 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
                validate: (value) =>
                  value === getValues("password") || "password dont match",
              })}
            />
            <span
              className="input-group-text bg-transparent"
              onClick={toggleConfirmPasswordVisibility}
            >
              <i
                className={
                  showConfirmPassword
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
              ></i>
            </span>
          </div>
          {errors.confirmPassword && (
            <span className="text-danger">
              {errors.confirmPassword.message}
            </span>
          )}
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
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
}
