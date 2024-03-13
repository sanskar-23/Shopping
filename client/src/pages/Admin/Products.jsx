import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All Products List</h1>
            <div className="grid-container">
              {products?.map((p) => (
                <Link
                  to={`/dashboard/admin/product/${p?.slug}`}
                  key={p._id}
                  className="product-link"
                >
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
