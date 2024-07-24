import React from "react";
import "../admin/admin-styles/AdminDashboard.css";
import AdminNavbar from "../admin/AdminNavbar"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import back5 from "../../images/back5.jpg";

function Dashboard() {

  return (
    <div className="admin-home" style={{ backgroundImage: `url(${back5})` }}>
      <AdminNavbar />
      <div className="admin-home-content">
        <h1>Welcome to Admin Dashboard</h1>
      </div>
    </div>
  );
}

export default Dashboard;
