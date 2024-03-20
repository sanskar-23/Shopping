import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "../context/cart.js";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product?._id, data?.product?.category?._id);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
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
            {relatedProducts.length > 0 && (
              <>
                <h2 className="text-primary  text-center">Similar Products</h2>
                <div className="row">
                  {relatedProducts?.map((p) => (
                    <div className="col-md-4" key={p._id}>
                      <div className="product-link">
                        <div className="card mb-2">
                          <img
                            src={`/api/v1/product/product-photo/${p?._id}`}
                            alt={p?.name}
                            className="card-img-top"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{p?.name}</h5>
                            <h5 className="card-title card-price">
                              {p?.price.toLocaleString("en-US", {
                                style: "currency",
                                currency: "USD",
                              })}
                            </h5>
                            <p className="card-text">
                              {truncateDescription(p?.description, 100)}
                            </p>

                            <button
                              className="btn btn-info m-1"
                              onClick={() => navigate(`/product/${p?.slug}`)}
                            >
                              More Details
                            </button>
                            <button
                              className="btn btn-dark ms-2"
                              onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem(
                                  "cart",
                                  JSON.stringify([...cart, p])
                                );
                                toast.success("Item Added to Cart");
                              }}
                            >
                              ADD TO CART
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetails;
