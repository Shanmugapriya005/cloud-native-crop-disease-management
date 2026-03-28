import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const role = localStorage.getItem("role");
  const location = useLocation();

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard",  icon: "▪" },
    { to: "/admin/scans",     label: "Scans",       icon: "▪" },
    { to: "/admin/users",     label: "Users",       icon: "▪" },
    { to: "/admin/feedback",  label: "Feedback",    icon: "▪" },
  ];

  const userLinks = [
    { to: "/user/dashboard",  label: "Dashboard",   icon: "▪" },
    { to: "/feedback",        label: "Feedback",    icon: "▪" },
  ];

  const links = role === "admin" ? adminLinks : userLinks;

  return (
    <div style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logo}>
        <span style={styles.logoIcon}>🌿</span>
        <span style={styles.logoText}>CropCare</span>
      </div>

      {/* Role badge */}
      <div style={styles.roleBadge}>
        {role === "admin" ? "Administrator" : "User Panel"}
      </div>

      {/* Nav */}
      <nav style={styles.nav}>
        <p style={styles.navLabel}>MENU</p>
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              style={{
                ...styles.navItem,
                ...(active ? styles.navItemActive : {}),
              }}
            >
              <span style={active ? styles.activeDot : styles.dot} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={styles.bottom}>
        <div style={styles.bottomUser}>
          <div style={styles.bottomAvatar}>
            {(localStorage.getItem("userEmail") || "U").charAt(0).toUpperCase()}
          </div>
          <div style={styles.bottomInfo}>
            <p style={styles.bottomEmail}>
              {localStorage.getItem("userEmail") || ""}
            </p>
            <p style={styles.bottomRole}>{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: 240, height: "100vh",
    background: "#0f172a",
    position: "fixed", top: 0, left: 0,
    display: "flex", flexDirection: "column",
    fontFamily: "'Segoe UI', sans-serif",
    borderRight: "1px solid #1e293b",
  },
  logo: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "24px 20px 16px",
    borderBottom: "1px solid #1e293b",
  },
  logoIcon: { fontSize: 22 },
  logoText: {
    fontSize: 18, fontWeight: 800, color: "#f8fafc",
    letterSpacing: "-0.3px",
  },
  roleBadge: {
    margin: "12px 16px",
    background: "#1e293b",
    color: "#94a3b8",
    fontSize: 11, fontWeight: 600,
    padding: "6px 12px", borderRadius: 6,
    textAlign: "center", letterSpacing: "0.5px",
    textTransform: "uppercase",
  },
  nav: { flex: 1, padding: "8px 12px", overflowY: "auto" },
  navLabel: {
    fontSize: 10, fontWeight: 700, color: "#475569",
    letterSpacing: "1.5px", padding: "8px 8px 6px",
    margin: 0,
  },
  navItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", borderRadius: 8,
    fontSize: 14, fontWeight: 500, color: "#94a3b8",
    textDecoration: "none", marginBottom: 2,
    transition: "all 0.15s",
  },
  navItemActive: {
    background: "#1e293b", color: "#f8fafc", fontWeight: 600,
  },
  dot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#334155", flexShrink: 0,
  },
  activeDot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#10b981", flexShrink: 0,
  },
  bottom: {
    padding: "16px", borderTop: "1px solid #1e293b",
  },
  bottomUser: {
    display: "flex", alignItems: "center", gap: 10,
  },
  bottomAvatar: {
    width: 34, height: 34, borderRadius: 8,
    background: "#1e293b", color: "#94a3b8",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 14, flexShrink: 0,
  },
  bottomInfo: { flex: 1, minWidth: 0 },
  bottomEmail: {
    fontSize: 11, color: "#64748b", margin: 0,
    whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
  },
  bottomRole: {
    fontSize: 11, color: "#475569", margin: "2px 0 0",
    textTransform: "capitalize",
  },
};

export default Sidebar;
