import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../utils/api/user_api";
import { setUser } from "../utils/slicers/userSlice";
import { addNotification } from "../utils/slicers/notificationSlice";
import Sidebar from "../components/AccountSidebar";

const MyAccountPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    billing: {
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    }
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        billing: {
          address: user?.billing?.address || '',
          city: user?.billing?.city || '',
          state: user?.billing?.state || '',
          country: user?.billing?.country || '',
          zipCode: user?.billing?.zipCode || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await updateProfile({
        data: {
          name: formData.name,
          phone: formData.phone,
          billing: formData.billing
        }
      });

      if (response.status) {
        dispatch(setUser(response.data));
        dispatch(addNotification({
          type: "success",
          title: "Success",
          description: "Profile updated successfully"
        }));
        setIsEditing(false);
      } else {
        dispatch(addNotification({
          type: "error",
          title: "Error",
          description: response?.message || "Failed to update profile"
        }));
      }
    } catch (error) {
      dispatch(addNotification({
        type: "error",
        title: "Error",
        description: error.message || "Failed to update profile"
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to user data
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        billing: {
          address: user?.billing?.address || '',
          city: user?.billing?.city || '',
          state: user?.billing?.state || '',
          country: user?.billing?.country || '',
          zipCode: user?.billing?.zipCode || ''
        }
      });
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
        <Sidebar/>
        {/* Profile Form */}
        <div className="w-full lg:w-3/4 bg-white p-8 rounded-lg shadow-sm border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#db4444] text-xl font-medium">
              {isEditing ? 'Edit Your Profile' : 'My Profile'}
            </h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-[#db4444] border border-[#db4444] rounded hover:bg-red-50 transition"
              >
                Edit Profile
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="flex flex-wrap gap-6">
              <div className="flex-1 min-w-[250px]">
                <label className="block text-black text-sm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                />
              </div>
              <div className="flex-1 min-w-[250px]">
                <label className="block text-black text-sm mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                />
              </div>
            </div>

            {/* Billing Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-medium">Billing Information</h4>
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-black text-sm mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="billing.address"
                    value={formData.billing.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                  />
                </div>
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-black text-sm mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="billing.city"
                    value={formData.billing.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-6">
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-black text-sm mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="billing.state"
                    value={formData.billing.state}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                  />
                </div>
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-black text-sm mb-2">
                    Country
                  </label>
                  <input
                    type="text"
                    name="billing.country"
                    value={formData.billing.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                  />
                </div>
                <div className="flex-1 min-w-[250px]">
                  <label className="block text-black text-sm mb-2">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="billing.zipCode"
                    value={formData.billing.zipCode}
                    onChange={handleChange}
                    disabled={!isEditing}
                    className="w-full p-3 bg-gray-100 rounded border focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-75"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex justify-end items-center gap-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="text-black text-base underline hover:text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-[#db4444] text-white rounded hover:bg-[#c03838] transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
};

export default MyAccountPage;