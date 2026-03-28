import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail") || "";
  const role  = localStorage.getItem("role") || "user";
  const initial = email.charAt(0).toUpperCase();

  const logout = () => {
    if (email) {
      fetch("http://localhost:5001/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    }
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div style={styles.topbar}>
      <h1 style={styles.title}>🌱 Crop Disease Management</h1>

      <div style={{ position: "relative" }}>
        <div onClick={() => setOpen(!open)} style={styles.avatar}>
          {initial}
        </div>

        {open && (
          <div style={styles.dropdown}>
            <div style={styles.dropdownHeader}>
              <p style={styles.dropdownEmail}>{email}</p>
              <p style={styles.dropdownRole}>{role}</p>
            </div>
            <div style={styles.dropdownDivider} />
            <button
              style={styles.dropdownItem}
              onClick={() => { setOpen(false); navigate(role === "admin" ? "/admin/profile" : "/user/profile"); }}
            >
              👤 Profile
            </button>
            <button style={{ ...styles.dropdownItem, color: "#ef4444" }} onClick={logout}>
              🚪 Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  topbar: {
    height: 60, background: "white",
    borderBottom: "1px solid #e2e8f0",
    display: "flex", alignItems: "center",
    justifyContent: "space-between",
    padding: "0 28px",
  },
  title: {
    fontSize: 16, fontWeight: 700, color: "#0f172a",
    letterSpacing: "-0.2px",
  },
  avatar: {
    width: 36, height: 36, borderRadius: 8,
    background: "#0f172a", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 15, cursor: "pointer",
    userSelect: "none",
  },
  dropdown: {
    position: "absolute", right: 0, top: 44,
    background: "white", borderRadius: 10,
    border: "1px solid #e2e8f0",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    width: 200, zIndex: 999, overflow: "hidden",
  },
  dropdownHeader: { padding: "12px 14px" },
  dropdownEmail: { fontSize: 12, color: "#0f172a", fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  dropdownRole: { fontSize: 11, color: "#94a3b8", margin: "2px 0 0", textTransform: "capitalize" },
  dropdownDivider: { height: 1, background: "#f1f5f9" },
  dropdownItem: {
    display: "block", width: "100%", textAlign: "left",
    padding: "10px 14px", background: "none", border: "none",
    fontSize: 13, fontWeight: 500, color: "#374151",
    cursor: "pointer",
  },
};

export default Topbar;
