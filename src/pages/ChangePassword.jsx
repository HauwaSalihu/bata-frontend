import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changePassword } from "../utils/api/user_api";
import { addNotification } from "../utils/slicers/notificationSlice";
import Sidebar from "../components/AccountSidebar";

const ChangePasswordPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "New passwords do not match"
      }));
      return;
    }

    if (passwordData.newPassword.length < 6) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: "Password must be at least 6 characters long"
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await changePassword({
        data: {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }
      });

      if (response.status) {
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Password updated successfully"
        }));
        // Clear form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: response?.message || "Failed to update password"
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to update password"
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="px-4 lg:px-20 mb-10 mt-10">
      {/* Hyperlink Section */}
      <section className="container flex flex-wrap justify-between items-center mx-auto mb-8">
        <ul className="flex gap-2 text-sm text-gray-500">
          <li>Home</li>
          <li>/</li>
          <li className="font-medium text-black">My Account</li>
        </ul>
        <div className="flex items-center text-sm">
          <span className="text-black mr-1">Welcome!</span>
          <span className="text-[#db4444]">{user?.name}</span>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
        {/* Side Menu */}
        <Sidebar />

        {/* Change Password Form */}
        <div className="w-full lg:w-3/4 bg-white p-8 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#db4444] text-xl font-medium">
              Change Password
            </h3>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex-1">
              <label className="block text-black text-sm mb-2">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handleChange}
                className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200"
                required
              />
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-black text-sm mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex-1 min-w-[250px]">
                <label className="block text-black text-sm mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default ChangePasswordPage;