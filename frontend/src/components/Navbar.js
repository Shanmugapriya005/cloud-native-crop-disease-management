import { Link, useNavigate } from "react-router-dom";
//import "./Navbar.css";

function Navbar({ role }) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("adminEmail");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">🌱 CropCare</h2>

      <ul className="nav-links">

        {role === "user" && (
          <>
            <li>
              <Link to="/user/dashboard">Scan Crop</Link>
            </li>

            <li>
              <Link to="/user/history">Scan History</Link>
            </li>

            <li>
              <Link to="/user/notifications">Notifications</Link>
            </li>

            <li>
              <Link to="/feedback">Feedback</Link>
            </li>
          </>
        )}

        {role === "admin" && (
          <>
            <li>
              <Link to="/admin/dashboard">Admin Panel</Link>
            </li>
          </>
        )}

        <li>
          <button className="logout-btn" onClick={logout}>
            Logout
          </button>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;