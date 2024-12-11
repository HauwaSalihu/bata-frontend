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
  // const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { confirm_password, password } = credentials;

    // Basic validation
    if (confirm_password != password) {
      dispatch(
        addNotification({
          type: "error",
          title: "Validation Error",
          description: "Password and Confirm Password does not match.",
        })
      );
      return;
    }
    // config:{show_loader:false, show_error:true}
    // setIsLoading(true);
    const { status, message, data } = await register({
      data: { ...credentials, confirm_password: undefined },
    });
    console.log(status, message, data);
    if (status) {
      // dispatch(setUserAuth({ user: data.user, token:data.token }));
      // navigate("/");
    } else {
      dispatch(
        addNotification({
          type: "error",
          title: "Operation Failed!",
          description: message,
        })
      );
    }
    // setIsLoading(false);
  };

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
            />
          </div>

          {/* Create Account Button */}
          <div>
            <button className="w-full py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition">
              Create Account
            </button>
          </div>

          {/* Sign up with Google */}
          {/* <div className="border border-gray-400 rounded-lg flex justify-center items-center py-3 hover:shadow-md transition">
            <i className="fab fa-google text-red-500 mr-2"></i>
            <button className="text-black font-medium">
              Sign up with Google
            </button>
          </div> */}
        </form>

        {/* Already have an account */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="login.html"
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
