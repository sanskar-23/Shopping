import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import "./AdminDashboard.css"; // Import custom CSS for styling

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3 dashboard-card">
              <h3 className="dashboard-heading">Admin Details</h3>
              <div className="admin-details">
                <p>
                  <strong>Name:</strong> {auth?.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {auth?.user?.email}
                </p>
                <p>
                  <strong>Contact:</strong> {auth?.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
