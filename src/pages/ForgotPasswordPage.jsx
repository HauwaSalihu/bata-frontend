import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../utils/slicers/notificationSlice";
import { forgotPassword } from "../utils/api/user_api"; // You'll need to create this API function

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      dispatch(
        addNotification({
          type: "error",
          title: "Validation Error",
          description: "Please enter your email address.",
        })
      );
      return;
    }

    const { status, message } = await forgotPassword({
      data: { email },
    });

    if (status) {
      dispatch(
        addNotification({
          type: "success",
          title: "Success",
          description: "Password reset instructions have been sent to your email.",
        })
      );
      navigate("/login");
    } else {
      dispatch(
        addNotification({
          type: "error",
          title: "Operation Failed!",
          description: message,
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
            Forgot Password
          </h1>
          <p className="text-base text-gray-600">
            Enter your email address below and we'll send you password reset instructions
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button 
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              Send Reset Instructions
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

export default ForgotPasswordPage;