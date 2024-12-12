import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <div className="flex w-full">
        {/* Sidebar for Large Screens */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <AdminSidebar />
        </div>

        {/* Mobile Sidebar */}
        <div className={`
          fixed top-0 left-0 w-64 h-full 
          bg-white shadow-lg z-50 transform transition-transform duration-300
          lg:hidden
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="p-4 flex justify-end">
            <button 
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
          <AdminSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 lg:w-[calc(100%-16rem)] overflow-x-auto">
          {/* Mobile Sidebar Toggle */}
          <div className="lg:hidden p-4 bg-white shadow-sm">
            <button 
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900"
            >
              ☰ Menu
            </button>
          </div>

          {/* Main Content */}
          <div className="p-2 sm:p-3 lg:p-2 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;