import React, { useState } from "react";
import { register } from "../utils/api/user_api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNotification } from "../utils/slicers/notificationSlice";

const SignUpPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    phone: "",
    name: "",
    password: "",
    confirm_password: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirm_password, password } = credentials;

    // Basic validation
    if (confirm_password !== password) {
      dispatch(
        addNotification({
          type: "error",
          title: "Validation Error",
          description: "Password and Confirm Password do not match.",
        })
      );
      return;
    }

    try {
      const { status, message, data } = await register({
        data: { ...credentials, confirm_password: undefined },
      });
    
      if (status) {
        setSignupSuccess(true);
        dispatch(
          addNotification({
            type: "success",
            title: "Account Created",
            description: "Please check your email to verify your account.",
          })
        );
      } else {
        dispatch(
          addNotification({
            type: "error",
            title: "Operation Failed!",
            description: message,
          })
        );
      }
    } catch (error) {
      dispatch(
        addNotification({
          type: "error",
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
        })
      );
    }
  };

  // If signup is successful, show verification message
  if (signupSuccess) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
        <div className="flex flex-col max-w-md w-full bg-white p-8 shadow-lg rounded-lg text-center">
          <div className="mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-20 w-20 mx-auto text-green-500 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Account Created Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a verification email to <span className="font-medium">{credentials.email}</span>. 
              Please check your inbox and click the verification link to activate your account.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder 
              </p>
              <button 
                onClick={() => navigate('/login')}
                className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Original signup form
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-medium text-black tracking-wide mb-2">
            Create an account
          </h1>
          <p className="text-base text-gray-600">Enter your details below</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={credentials.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/*Phone */}
          <div>
            <input
              type="text"
              name="phone"
              value={credentials.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
              minLength={6}
            />
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirm_password"
              value={credentials.confirm_password}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
              required
              minLength={6}
            />
          </div>

          {/* Create Account Button */}
          <div>
            <button 
              type="submit" 
              className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Already have an account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-red-600 font-medium hover:underline"
            >
              Log in
            </a>
          </p>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;