import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { setUserAuth } from "../utils/slicers/userSlice";
import { addNotification } from "../utils/slicers/notificationSlice";
import { login } from "../utils/api/user_api";
import { getCart } from "../utils/api/cart";
import { updateCart } from "../utils/slicers/cartSlice";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    identifier: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { identifier, password } = credentials;

    // Basic validation
    if (!identifier || !password) {
      dispatch(
        addNotification({
          type: "error",
          title: "Validation Error",
          description: "Please fill in both identifier and password.",
        })
      );
      return;
    }

    setIsLoading(true);
    const { status, message, data } = await login({ data: credentials });
    if (status) { 
      dispatch(setUserAuth({ user: data.user, token: data.token }));    
      navigate("/");
      const cartResponse = await getCart({})
      if (cartResponse?.status) {
        // Match backend response format exactly
        const { cart, total, itemCount, invalidItems } = cartResponse.data;
        dispatch(updateCart({
          cart,
          total,
          itemCount,
          invalidItems
        }));
      }
  
    } else {
      dispatch(
        addNotification({
          type: "error",
          title: "Operation Failed!",
          description: message,
        })
      );
    }
    setIsLoading(false);
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col items-center max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-medium text-black tracking-wide mb-2">
            Log in
          </h2>
          <p className="text-base text-gray-700">Enter your details below</p>
        </div>

        {/* Form */}
        <form className="w-full space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="identifier"
              value={credentials.identifier}
              onChange={handleChange}
              placeholder="Email or Phone Number"
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border-b border-gray-400 text-gray-700 text-base focus:outline-none focus:border-red-500"
            />

          </div>
          <div className="flex justify-between items-center w-full mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-red-600 text-white text-base font-medium rounded-md hover:bg-red-700 transition disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>

        {/* Forgot Password */}
        <br />
        <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
    </main>
  );
};

export default LoginPage;
