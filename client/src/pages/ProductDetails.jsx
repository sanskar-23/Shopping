import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./ProductDetails.css"; // Import the CSS file for custom styles

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-5 product-details-container">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              className="img-fluid rounded hover-zoom"
              alt={product.name}
            />
          </div>
          <div className="col-md-6 d-flex flex-column justify-content-center product-details">
            <h1 className="fw-bold text-primary mb-4">Product Details</h1>
            <h2 className="mb-3">{product.name}</h2>
            <p className="mb-3">{product.description}</p>
            <div className="d-flex align-items-center mb-3">
              <h4 className="me-3">${product.price}</h4>
              <button className="btn btn-primary btn-hover">ADD TO CART</button>
            </div>
            <p className="text-muted mb-0">
              Category: {product?.category?.name}
            </p>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="container mt-4">
        <h2 className="text-primary mb-4">Similar Products</h2>
        {/* Add similar products section here */}
      </div>
    </Layout>
  );
};

export default ProductDetails;
