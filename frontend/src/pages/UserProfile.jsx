import { useEffect, useState } from "react";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5001/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) { setError(data.message); return; }
        setUser(data);
      } catch {
        setError("Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  if (error) return <p style={{ color: "red", padding: 24 }}>{error}</p>;
  if (!user) return <p style={{ padding: 24 }}>Loading...</p>;

  const initials = (user.name || user.email).charAt(0).toUpperCase();

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* Avatar */}
        <div style={styles.avatarWrap}>
          <div style={styles.avatar}>{initials}</div>
        </div>

        <h2 style={styles.name}>{user.name || "—"}</h2>
        <span style={styles.badge}>{user.role}</span>

        <div style={styles.divider} />

        {/* Info rows */}
        <div style={styles.infoList}>
          <InfoRow icon="✉️" label="Email" value={user.email} />
          <InfoRow icon="🛡️" label="Role" value={user.role} />
          <InfoRow
            icon="📅"
            label="Member since"
            value={user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "—"}
          />
          <InfoRow
            icon="🕐"
            label="Last login"
            value={user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-IN") : "—"}
          />
          <InfoRow
            icon="🟢"
            label="Status"
            value={user.isOnline ? "Online" : "Offline"}
            valueColor={user.isOnline ? "#16a34a" : "#6b7280"}
          />
        </div>

      </div>
    </div>
  );
};

const InfoRow = ({ icon, label, value, valueColor }) => (
  <div style={styles.infoRow}>
    <span style={styles.infoIcon}>{icon}</span>
    <span style={styles.infoLabel}>{label}</span>
    <span style={{ ...styles.infoValue, color: valueColor || "#1f2937" }}>{value}</span>
  </div>
);

const styles = {
  page: {
    display: "flex", justifyContent: "center", alignItems: "flex-start",
    padding: "40px 20px", minHeight: "100vh", background: "#f8fafc",
  },
  card: {
    background: "white", borderRadius: 20, padding: "40px 36px",
    width: "100%", maxWidth: 480,
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
    display: "flex", flexDirection: "column", alignItems: "center",
  },
  avatarWrap: {
    marginBottom: 16,
  },
  avatar: {
    width: 80, height: 80, borderRadius: "50%",
    background: "linear-gradient(135deg, #16a34a, #4ade80)",
    color: "white", fontSize: 32, fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 14px rgba(22,163,74,0.4)",
  },
  name: {
    fontSize: 22, fontWeight: 700, color: "#1f2937", margin: "0 0 8px",
  },
  badge: {
    background: "#dcfce7", color: "#16a34a",
    fontSize: 12, fontWeight: 600, padding: "4px 14px",
    borderRadius: 20, textTransform: "capitalize",
  },
  divider: {
    width: "100%", height: 1, background: "#f3f4f6", margin: "24px 0",
  },
  infoList: {
    width: "100%", display: "flex", flexDirection: "column", gap: 14,
  },
  infoRow: {
    display: "flex", alignItems: "center", gap: 12,
    background: "#f9fafb", borderRadius: 10, padding: "10px 14px",
  },
  infoIcon: { fontSize: 18, width: 24, textAlign: "center" },
  infoLabel: { fontSize: 13, color: "#6b7280", flex: 1 },
  infoValue: { fontSize: 14, fontWeight: 600 },
};

export default UserProfile;
