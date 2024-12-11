import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      title: "Manage My Account",
      items: [
        { 
          name: "My Profile", 
          path: "/profile",
          icon: "👤"  // user icon
        },
        { 
          name: "Change Password", 
          path: "/change-password",
          icon: "🔑"  // key icon
        }
      ]
    },
    {
      title: "My Orders",
      items: [
        { 
          name: "Order History", 
          path: "/orders",
          icon: "📦"  // package icon
        },
        // { 
        //   name: "My Cancellations", 
        //   path: "/cancellations",
        //   icon: "❌"  // x icon
        // }
      ]
    }
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <aside className="flex-shrink-0 w-full lg:w-1/4">
      <div className="p-6 bg-white rounded-lg shadow-sm border">
        {menuItems.map((section, index) => (
          <div 
            key={section.title} 
            className={`${index !== 0 ? 'mt-6' : ''}`}
          >
            <h4 className="text-black text-base font-medium mb-4">
              {section.title}
            </h4>
            <div className="flex flex-col gap-3">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    group flex items-center gap-3 py-2 px-3 rounded-md transition-all
                    ${isActivePath(item.path) 
                      ? 'text-[#db4444] bg-red-50 font-medium' 
                      : 'text-gray-600 hover:text-[#db4444] hover:bg-red-50/50'
                    }
                  `}
                >
                  <span className={`
                    text-sm
                    ${isActivePath(item.path) 
                      ? 'opacity-100' 
                      : 'opacity-50 group-hover:opacity-100'
                    }
                  `}>
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;