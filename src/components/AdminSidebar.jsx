// components/AdminSidebar.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const user = useSelector((state)=>state.user.user);

  const menuItems = [
    {
      name: "Overview",
      path: "/admin/dashboard"
    },
    {
      name: "Products",
      path: "/admin/products"
    },
    {
      name: "Orders",
      path: "/admin/orders"
    },
    {
      name: "Reviews",
      path: "/admin/reviews"
    },
    {
      name: "Sales",
      path: "/admin/sales"
    },
    {
      name: "Categories",
      path: "/admin/categories"
    },
    {
      name: "Users",
      path: "/admin/users"
    }
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r sticky top-0">
      {/* Logo Section */}
      <div className="h-16 border-b flex items-center px-6">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <span className="text-lg font-semibold">Admin Panel</span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              location.pathname === item.path
                ? "bg-[#db4444] text-white"
                : "text-gray-600 hover:bg-red-50 hover:text-[#db4444]"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* User Section */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;