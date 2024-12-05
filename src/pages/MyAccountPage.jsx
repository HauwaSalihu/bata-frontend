import React from "react";

const MyAccountPage = () => {
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
          <span className="text-red-600">Amina Salihu</span>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex flex-wrap lg:flex-nowrap justify-between gap-8">
        {/* Side Menu */}
        <aside className="flex-shrink-0 w-full lg:w-1/4">
          <h4 className="text-black text-base font-medium mb-4">
            Manage My Account
          </h4>
          <div className="flex flex-col gap-4">
            <h5 className="text-red-600 text-base">My Profile</h5>
            <p className="text-black text-opacity-50">Address Book</p>
            <p className="text-black text-opacity-50">My Payment Options</p>
          </div>
          <h4 className="text-black text-base font-medium mt-6">My Orders</h4>
          <div className="flex flex-col gap-4 mt-4">
            <p className="text-black text-opacity-50">My Returns</p>
            <p className="text-black text-opacity-50">My Cancellations</p>
          </div>
          <h4 className="text-black text-base font-medium mt-6">My Wishlist</h4>
        </aside>

        {/* Profile Form */}
        <div className="w-full lg:w-3/4 bg-white p-8 rounded shadow">
          <h3 className="text-red-600 text-xl font-medium mb-6">
            Edit Your Profile
          </h3>
          <form className="space-y-6">
            {/* First Row: Name Fields */}
            <div className="flex flex-wrap gap-6">
              <div className="flex-1">
                <label className="block text-black text-base mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Amina"
                  className="w-full p-3 bg-gray-100 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-black text-base mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Salihu"
                  className="w-full p-3 bg-gray-100 rounded"
                />
              </div>
            </div>

            {/* Second Row: Email and Address Fields */}
            <div className="flex flex-wrap gap-6">
              <div className="flex-1">
                <label className="block text-black text-base mb-2">Email</label>
                <input
                  type="email"
                  placeholder="aminasalihuwork@gmail.com"
                  className="w-full p-3 bg-gray-100 rounded"
                />
              </div>
              <div className="flex-1">
                <label className="block text-black text-base mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Lungu Lungu Abuja"
                  className="w-full p-3 bg-gray-100 rounded"
                />
              </div>
            </div>

            {/* Password Section */}
            <div>
              <label className="block text-black text-base mb-2">
                Password Changes
              </label>
              <input
                type="password"
                placeholder="Current Password"
                className="w-full mb-4 p-3 bg-gray-100 rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full mb-4 p-3 bg-gray-100 rounded"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-3 bg-gray-100 rounded"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center gap-6">
              <button
                type="button"
                className="text-black text-base underline hover:text-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
};

export default MyAccountPage;
