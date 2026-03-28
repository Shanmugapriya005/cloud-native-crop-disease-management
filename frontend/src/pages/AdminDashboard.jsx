import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentScans, setRecentScans] = useState([]);
  const [loggedInUsers, setLoggedInUsers] = useState([]);

  const loadDashboard = async () => {
    const token = localStorage.getItem("token");
    try {
      const [feedbackRes, usersRes, scansRes, loggedInRes] = await Promise.all([
        fetch("http://localhost:5001/api/feedback"),
        fetch("http://localhost:5001/api/auth/users"),
        fetch("http://localhost:5001/api/upload/all", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("http://localhost:5001/api/auth/logged-in"),
      ]);
      const feedback = await feedbackRes.json();
      const users = await usersRes.json();
      const scans = await scansRes.json();
      const online = await loggedInRes.json();

      setFeedbackCount(feedback.length || 0);
      setUserCount(users.length || 0);
      setRecentScans(Array.isArray(scans) ? scans.slice(0, 6) : []);
      setLoggedInUsers(Array.isArray(online) ? online : []);
    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  useEffect(() => {
    loadDashboard();
    const interval = setInterval(loadDashboard, 15000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="ad-page">

      {/* Header */}
      <div className="ad-header">
        <div className="ad-header-left">
          <h2>Admin Dashboard</h2>
          <p>Monitor platform activity and manage users</p>
        </div>
        <div className="ad-header-date">📅 {today}</div>
      </div>

      {/* Stats */}
      <div className="ad-stats">
        <div className="ad-stat-card ad-stat-blue" onClick={() => navigate("/admin/users")}>
          <div className="ad-stat-icon-box">👥</div>
          <div className="ad-stat-body">
            <p className="ad-stat-label">Registered Users</p>
            <p className="ad-stat-value">{userCount}</p>
          </div>
          <span className="ad-stat-arrow">›</span>
        </div>
        <div className="ad-stat-card ad-stat-purple" onClick={() => navigate("/admin/feedback")}>
          <div className="ad-stat-icon-box">💬</div>
          <div className="ad-stat-body">
            <p className="ad-stat-label">Total Feedback</p>
            <p className="ad-stat-value">{feedbackCount}</p>
          </div>
          <span className="ad-stat-arrow">›</span>
        </div>
        <div className="ad-stat-card ad-stat-green" onClick={() => navigate("/admin/scans")}>
          <div className="ad-stat-icon-box">🧪</div>
          <div className="ad-stat-body">
            <p className="ad-stat-label">Total Scans</p>
            <p className="ad-stat-value">{recentScans.length}</p>
          </div>
          <span className="ad-stat-arrow">›</span>
        </div>
        <div className="ad-stat-card ad-stat-orange">
          <div className="ad-stat-icon-box">🟢</div>
          <div className="ad-stat-body">
            <p className="ad-stat-label">Online Now</p>
            <p className="ad-stat-value">{loggedInUsers.length}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="ad-grid">

        {/* Logged-in Users */}
        <div className="ad-card">
          <div className="ad-card-header">
            <h3>Active Users</h3>
            <span className="ad-live-badge">Live</span>
          </div>
          {loggedInUsers.length === 0 ? (
            <p className="ad-empty">No users currently online</p>
          ) : (
            <div className="ad-recent-list">
              {loggedInUsers.map((u, i) => (
                <div key={i} className="ad-recent-item">
                  <div className="ad-avatar">{(u.name || u.email).charAt(0).toUpperCase()}</div>
                  <div className="ad-recent-info">
                    <p className="ad-recent-name">{u.name || "—"}</p>
                    <p className="ad-recent-user">{u.email}</p>
                    <p className="ad-recent-date">
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleString() : "—"}
                    </p>
                  </div>
                  <span className="ad-online-dot" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Scans */}
        <div className="ad-card">
          <div className="ad-card-header">
            <h3>Recent Scans</h3>
            <button className="ad-view-all" onClick={() => navigate("/admin/scans")}>View All</button>
          </div>
          {recentScans.length === 0 ? (
            <p className="ad-empty">No scans yet</p>
          ) : (
            <div className="ad-recent-list">
              {recentScans.map((scan, i) => (
                <div key={i} className="ad-recent-item">
                  <img src={scan.imageUrl} alt="scan" className="ad-recent-img" />
                  <div className="ad-recent-info">
                    <p className="ad-recent-name">{scan.imageName}</p>
                    <p className="ad-recent-user">{scan.user?.email || "Unknown"}</p>
                    <p className="ad-recent-date">{new Date(scan.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
