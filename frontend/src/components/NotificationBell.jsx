import { useEffect, useState } from "react";

function NotificationBell({ role }) {

  const [count, setCount] = useState(0);

  const loadNotifications = async () => {

    try {

      const res = await fetch("http://localhost:5001/api/feedback");

      const data = await res.json();

      setCount(data.length);

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {

    if (role === "admin") {
      loadNotifications();
    }

  }, [role]);

  if (role !== "admin") return null;

  return (

    <div style={{ position: "relative" }}>

      🔔

      {count > 0 && (
        <span
          style={{
            position: "absolute",
            top: "-5px",
            right: "-10px",
            background: "red",
            color: "white",
            borderRadius: "50%",
            padding: "3px 6px",
            fontSize: "12px"
          }}
        >
          {count}
        </span>
      )}

    </div>

  );

}

export default NotificationBell;