import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getProductsByCat();
  }, [params?.slug]);

  const getProductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
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
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category[0]?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row justify-content-center">
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
                  <button className="btn btn-dark ms-2">ADD TO CART</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
