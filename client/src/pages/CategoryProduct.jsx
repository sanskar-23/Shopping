import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
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
    <Layout title={category[0]?.name}>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category[0]?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row justify-content-center">
          {!loading ? (
            <>
              {products?.map((p) => (
                <div className="col-md-4 mb-4" key={p._id}>
                  <div className="card h-100">
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
              ))}
            </>
          ) : (
            <>
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
