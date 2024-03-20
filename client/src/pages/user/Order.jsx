import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useEffect } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All Orders</h1>
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
                {orders?.map((o, i) => {
                  return (
                    <div className="border shadow" key={o?._id}>
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Status</th>
                            <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                            <th scope="col">Payment</th>
                            <th scope="col">Quantity</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{i + 1}</td>
                            <td>{o?.status}</td>
                            <td>{o?.buyer?.name}</td>
                            <td>{moment(o?.createAt).fromNow()}</td>
                            <th>
                              {o?.payment?.success ? "Success" : "Failed"}
                            </th>
                            <th>{o?.products?.length}</th>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container">
                        {o?.products?.map((p, i) => (
                          <div className="product-link" key={p?._id}>
                            <div className="card">
                              <img
                                src={`/api/v1/product/product-photo/${p?._id}`}
                                alt={p?.name}
                                className="card-img-top"
                              />
                              <div className="card-body">
                                <h5 className="card-title">{p?.name}</h5>
                                <p className="card-text">
                                  {truncateDescription(p?.description, 100)}
                                </p>
                                <h5 className="card-title card-price">
                                  {p?.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                  })}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
