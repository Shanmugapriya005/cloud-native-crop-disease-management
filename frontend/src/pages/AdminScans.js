import { useEffect, useState } from "react";

function AdminScans() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => { loadScans(); }, []);

  const loadScans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5001/api/upload/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log("Admin scans response:", data);
      setScans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading scans:", err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = scans.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.imageName?.toLowerCase().includes(q) ||
      s.user?.email?.toLowerCase().includes(q) ||
      s.user?.name?.toLowerCase().includes(q) ||
      s.crop?.toLowerCase().includes(q) ||
      s.disease?.toLowerCase().includes(q)
    );
  });

  const severityColor = (sev) => {
    if (!sev) return "#6b7280";
    const s = sev.toUpperCase();
    if (s === "HIGH") return "#ef4444";
    if (s === "MEDIUM") return "#f59e0b";
    if (s === "LOW") return "#22c55e";
    return "#6b7280";
  };

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>🧪 All User Scans</h2>
          <p style={styles.subtitle}>{scans.length} total uploads</p>
        </div>
        <input
          style={styles.search}
          placeholder="Search by user, crop, disease..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && <p style={styles.empty}>Loading scans...</p>}

      {!loading && filtered.length === 0 && (
        <p style={styles.empty}>No scans found.</p>
      )}

      <div style={styles.grid}>
        {filtered.map((scan, i) => (
          <div key={i} style={styles.card}>
            {/* Image */}
            <div style={styles.imgWrap}>
              {scan.imageUrl ? (
                <img
                  src={scan.imageUrl}
                  alt={scan.imageName}
                  style={styles.img}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div style={styles.noImg}>🌿 No Image</div>
              )}
            </div>

            <div style={styles.info}>
              {/* Filename */}
              <p style={styles.filename}>{scan.imageName}</p>

              {/* Prediction data — always shown */}
              <div style={styles.predBox}>
                <div style={styles.predRow}>
                  <span style={styles.predLabel}>Crop</span>
                  <span style={styles.predVal}>{scan.crop || "—"}</span>
                </div>
                <div style={styles.predRow}>
                  <span style={styles.predLabel}>Disease</span>
                  <span style={styles.predVal}>{scan.disease || "—"}</span>
                </div>
                <div style={styles.predRow}>
                  <span style={styles.predLabel}>Severity</span>
                  <span style={{ ...styles.predVal, color: severityColor(scan.severity) }}>
                    {scan.severity || "—"}
                  </span>
                </div>
                <div style={styles.predRow}>
                  <span style={styles.predLabel}>Confidence</span>
                  <span style={styles.predVal}>
                    {scan.confidence ? `${scan.confidence}%` : "—"}
                  </span>
                </div>
              </div>

              {/* User info */}
              <div style={styles.userRow}>
                <span style={styles.avatar}>
                  {scan.user?.name?.[0]?.toUpperCase() || "?"}
                </span>
                <div>
                  <p style={styles.userName}>{scan.user?.name || "Unknown"}</p>
                  <p style={styles.userEmail}>{scan.user?.email || "—"}</p>
                </div>
              </div>

              <p style={styles.date}>
                📅 {new Date(scan.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { padding: "28px", background: "#f8fafc", minHeight: "100vh" },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    marginBottom: "24px", flexWrap: "wrap", gap: "12px",
  },
  title: { fontSize: "22px", fontWeight: "700", color: "#1f2937", margin: "0 0 4px" },
  subtitle: { fontSize: "13px", color: "#6b7280", margin: 0 },
  search: {
    padding: "10px 16px", borderRadius: "10px", border: "1px solid #e5e7eb",
    fontSize: "14px", width: "260px", outline: "none",
    boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "white", borderRadius: "14px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden",
  },
  imgWrap: { width: "100%", height: "180px", overflow: "hidden", background: "#f3f4f6" },
  img: { width: "100%", height: "100%", objectFit: "cover" },
  noImg: {
    width: "100%", height: "100%", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontSize: "28px", color: "#9ca3af",
  },
  info: { padding: "14px" },
  filename: {
    fontSize: "13px", fontWeight: "600", color: "#1f2937",
    margin: "0 0 10px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  predBox: {
    background: "#f8fafc", borderRadius: "8px", padding: "10px",
    marginBottom: "10px", border: "1px solid #e5e7eb",
  },
  predRow: { display: "flex", justifyContent: "space-between", marginBottom: "4px" },
  predLabel: { fontSize: "12px", color: "#6b7280" },
  predVal: { fontSize: "12px", color: "#1f2937", fontWeight: "600" },
  userRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" },
  avatar: {
    width: "34px", height: "34px", borderRadius: "50%",
    background: "#2563eb", color: "white", display: "flex",
    alignItems: "center", justifyContent: "center",
    fontWeight: "700", fontSize: "14px", flexShrink: 0,
  },
  userName: { fontSize: "13px", fontWeight: "600", color: "#374151", margin: 0 },
  userEmail: { fontSize: "12px", color: "#6b7280", margin: 0 },
  date: { fontSize: "12px", color: "#9ca3af", margin: 0 },
  empty: { textAlign: "center", color: "#9ca3af", padding: "40px", fontSize: "15px" },
};

export default AdminScans;
