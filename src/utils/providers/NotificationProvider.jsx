import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotifications } from "../slicers/notificationSlice";

const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.notifications);
  const [visibleNotifications, setVisibleNotifications] = useState([]);
  useEffect(() => {
    if (notifications.length > 0) {

      notifications.forEach(({ type, title, description }) => {
        const id = Date.now() + Math.random(); // Generate unique ID for each notification
        setVisibleNotifications((prev) => [
          ...prev,
          { id, type, title, description },
        ]);

        // Remove notification after 5 seconds
        setTimeout(() => {
          setVisibleNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 5000);
      });

      dispatch(clearNotifications());
    }
  }, [dispatch, notifications]);

  return (
    <>
      {/* Notification container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col space-y-4">
        {visibleNotifications.map(({ id, type, title, description }) => (
          <div
            key={id}
            className={`p-4 rounded-md shadow-lg text-white ${
              type === "success"
                ? "bg-green-500"
                : type === "error"
                ? "bg-red-500"
                : type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
          >
            <h4 className="font-bold">{title}</h4>
            <p className="text-sm">{description}</p>
          </div>
        ))}
      </div>
      {children}
    </>
  );
};

export default NotificationProvider;
