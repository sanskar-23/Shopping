import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  const getAllUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/get-users");
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getAllUsers();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Users</h1>
            <div className="table-responsive">
              {loading ? (
                <>
                  <div className="text-center">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <table className="table table-striped table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact</th>
                        <th scope="col">Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users &&
                        users.length > 0 &&
                        users.map((u, index) => (
                          <tr key={u?._id || index}>
                            <td>{u?.name}</td>
                            <td>{u?.email}</td>
                            <td>{u?.phone}</td>
                            <td>{u?.address}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
