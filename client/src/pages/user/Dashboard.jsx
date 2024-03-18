import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Shopping"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow p-4">
              <h2 className="mb-4 text-center">Welcome, {auth?.user?.name}!</h2>
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="info-card mb-4">
                      <h4 className="info-title">Email</h4>
                      <p className="info-content">{auth?.user?.email}</p>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="info-card mb-4">
                      <h4 className="info-title">Contact</h4>
                      <p className="info-content">{auth?.user?.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
