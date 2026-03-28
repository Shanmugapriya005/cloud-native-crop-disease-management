import socket from "../services/socket";
import { useEffect, useState } from "react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  // 1️⃣ Load existing notifications (on page load)
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(stored);
  }, []);

  // 2️⃣ Listen for real-time notifications (Socket.io)
  useEffect(() => {
    socket.on("new-notification", (data) => {
      const newNotification = {
        id: Date.now(),
        message: data.message,
        read: false,
        time: "Just now",
        severity: data.severity,
      };

      setNotifications((prev) => {
        const updated = [newNotification, ...prev];
        localStorage.setItem(
          "notifications",
          JSON.stringify(updated)
        );
        return updated;
      });
    });

    // Cleanup (VERY important)
    return () => {
      socket.off("new-notification");
    };
  }, []);

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem("notifications", JSON.stringify(updated));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">🔔 Notifications</h2>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet</p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg shadow ${
                n.read
                  ? "bg-white"
                  : "bg-red-50 border-l-4 border-red-600"
              }`}
            >
              <p className="text-gray-800">{n.message}</p>
              <div className="flex justify-between mt-2 text-sm text-gray-500">
                <span>{n.time}</span>
                {!n.read && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="text-red-700 font-medium"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
