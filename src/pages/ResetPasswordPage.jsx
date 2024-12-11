import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addNotification } from "../utils/slicers/notificationSlice";
import { resetPassword } from "../utils/api/user_api";

const ResetPasswordPage = () => {
  const [passwords, setPasswords] = useState({
    password: "",
    confirm_password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { password, confirm_password } = passwords;

    // Validation
    if (password !== confirm_password) {
      dispatch(
        addNotification({
          type: "error",
          title: "Validation Error",
          description: "Passwords do not match.",
        })
      );
      return;
    }

    if (password.length < 6) {
      dispatch(
        addNotification({
          type: "error",
          title: "Validation Error",
          description: "Password must be at least 6 characters long.",
        })
      );
      return;
    }

    const { status, message } = await resetPassword({
      token,data: { password }
    });

    if (status) {
      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          description: "Your password has been reset successfully.",
        })
      );
      navigate("/login");
    } else {
      dispatch(
        addNotification({
          type: "error",
          title: "Operation Failed!",
          description: message || "Password reset failed. Please try again.",
        })
      );
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium text-black tracking-wide mb-2">
            Reset Password
          </h1>
          <p className="text-base text-gray-600">
            Please enter your new password
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* New Password */}
          <div>
            <input
              type="password"
              name="password"
              value={passwords.password}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
              minLength={6}
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <input
              type="password"
              name="confirm_password"
              value={passwords.confirm_password}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
              minLength={6}
            />
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              Reset Password
            </button>
          </div>
        </form>

        {/* Back to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-red-600 font-medium hover:underline"
            >
              Back to Login
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default ResetPasswordPage;