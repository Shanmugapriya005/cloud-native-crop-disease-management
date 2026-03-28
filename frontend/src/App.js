import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import UserDashboard from "./pages/UserDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import AdminUsers from "./pages/AdminUsers";
import AdminScans from "./pages/AdminScans";

import UserProfile from "./pages/UserProfile";
import AdminProfile from "./pages/AdminProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* USER AUTH */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />

        {/* USER DASHBOARD */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute role="user">
              <Layout>
                <UserDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* USER PROFILE */}
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute role="user">
              <Layout>
                <UserProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* USER FEEDBACK */}
        <Route
          path="/feedback"
          element={
            <ProtectedRoute role="user">
              <Layout>
                <Feedback />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN LOGIN */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* ADMIN PROFILE */}
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <AdminProfile />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* ADMIN DASHBOARD */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <AdminDashboard />
              </Layout>
            </ProtectedRoute>
          }
        />


<Route
 path="/admin/users"
 element={
  <ProtectedRoute role="admin">
   <Layout>
    <AdminUsers/>
   </Layout>
  </ProtectedRoute>
 }
/>

<Route
 path="/admin/scans"
 element={
  <ProtectedRoute role="admin">
   <Layout>
    <AdminScans/>
   </Layout>
  </ProtectedRoute>
 }
/>

<Route
 path="/user/dashboard"
 element={
   <ProtectedRoute role="user">
     <Layout>
       <UserDashboard />
     </Layout>
   </ProtectedRoute>
 }
/>
        {/* ADMIN FEEDBACK */}
        <Route
          path="/admin/feedback"
          element={
            <ProtectedRoute role="admin">
              <Layout>
                <AdminFeedback />
              </Layout>
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;