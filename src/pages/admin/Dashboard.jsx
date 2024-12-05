import React from "react";

const Dashboard = () => {
  return (
    <main className="lg:px-20 px-4 mt-20">
      {/* Header */}
      <div className="w-full lg:w-[30%]">
        <h1 className="text-black text-xl lg:text-[31.04px] font-black font-['Cairo']">
          Dashboard
        </h1>
        <p className="text-gray-600 text-sm lg:text-base font-medium font-['Cairo']">
          Hello Bata Stores, welcome back!
        </p>
      </div>

      {/* Main Content Wrapper */}
      <div className="flex flex-col lg:flex-row bg-white gap-4 lg:gap-6">
        {/* Sidebar */}
        <div className="bg-gray-100 w-full lg:w-1/4 h-auto lg:h-auto">
          <div className="flex flex-col gap-4 p-4">
            {/* Sidebar Items */}
            <div className="bg-gray-200 p-2 rounded-lg flex items-center gap-2">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <span className="text-black font-medium">Dashboard</span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500">Transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500">Orders</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <span className="text-gray-500">Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Overview */}
        <div className="w-full lg:w-3/4 bg-red-500 text-white rounded-md p-4">
          <h2 className="text-lg font-bold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Card */}
            <div className="bg-white/10 p-4 rounded-md">
              <p className="text-sm">Total Registered Users</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            {/* Card */}
            <div className="bg-white/10 p-4 rounded-md">
              <p className="text-sm">Total Orders Completed</p>
              <p className="text-2xl font-bold">375</p>
            </div>
            {/* Card */}
            <div className="bg-white/10 p-4 rounded-md">
              <p className="text-sm">Total Pending Orders</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="flex flex-col gap-5">
        <h1 className="text-black text-[31.04px] font-bold font-['Cairo']">
          Recent Orders
        </h1>

        {/* Filters */}
        <div className="h-10 justify-start items-start gap-4 inline-flex">
          <div className="px-3.5 py-2 bg-[#f5f6f7] rounded border border-[#e4e6eb] justify-start items-center flex">
            <div className="justify-center items-center gap-3 flex">
              <div className="w-4 h-4 relative"></div>
              <div className="w-[107px] text-[#757886] text-[15px] font-normal font-['Commissioner'] leading-normal">
                Select Filter
              </div>
              <div className="w-4 h-4 relative"></div>
            </div>
          </div>
          <div className="px-3.5 py-2 bg-[#f5f6f7] rounded border border-[#e4e6eb] justify-start items-center flex">
            <div className="justify-center items-center gap-3 flex">
              <div className="w-5 h-5 relative">
                <div className="w-[15px] h-[16.67px] left-[2.50px] top-[1.67px] absolute"></div>
              </div>
              <div className="w-20 text-[#4b4543] text-[15px] font-normal font-['Commissioner'] leading-normal">
                All Time
              </div>
              <div className="w-4 h-4 relative"></div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-['Cairo']">
            <thead className="bg-gray-100 text-left">
              <tr className="border-b-2">
                <th className="py-2 text-gray-500">Order ID</th>
                <th className="py-2 text-gray-700">Date</th>
                <th className="py-2 text-gray-700">Description</th>
                <th className="py-2 text-gray-700">Payment Status</th>
                <th className="py-2 text-gray-700">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2">
                <td className="py-2 text-gray-500">#A580</td>
                <td className="py-2 text-gray-700">Aug 15, 2021</td>
                <td className="py-2 text-gray-700">
                  Ship Container A7 10.4 Rusty (SM-T500 NZSAXAR)
                </td>
                <td className="py-2 text-green-600">Paid</td>
                <td className="py-2 text-green-600">Delivered</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 text-gray-500">#A581</td>
                <td className="py-2 text-gray-700">Aug 13, 2021</td>
                <td className="py-2 text-gray-700">
                  Ship Container A7 10.4 Rusty (SM-T500 NZSAXAR)
                </td>
                <td className="py-2 text-green-600">Paid</td>
                <td className="py-2 text-yellow-600">In Progress</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 text-gray-500">#A582</td>
                <td className="py-2 text-gray-700">Aug 12, 2021</td>
                <td className="py-2 text-gray-700">
                  Ship Container A7 10.4 Rusty (SM-T500 NZSAXAR)
                </td>
                <td className="py-2 text-red-600">Unpaid</td>
                <td className="py-2 text-red-600">Cancelled</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 text-gray-500">#A583</td>
                <td className="py-2 text-gray-700">Aug 12, 2021</td>
                <td className="py-2 text-gray-700">
                  Ship Container A7 10.4 Rusty (SM-T500 NZSAXAR)
                </td>
                <td className="py-2 text-green-600">Paid</td>
                <td className="py-2 text-yellow-600">In Progress</td>
              </tr>
              <tr className="border-b-2">
                <td className="py-2 text-gray-500">#A584</td>
                <td className="py-2 text-gray-700">Aug 10, 2021</td>
                <td className="py-2 text-gray-700">
                  Ship Container A7 10.4 Rusty (SM-T500 NZSAXAR)
                </td>
                <td className="py-2 text-green-600">Paid</td>
                <td className="py-2 text-green-600">Delivered</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
