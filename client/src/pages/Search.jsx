import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";
import { Link, useNavigate } from "react-router-dom";
import "./NoProductsFound.css";
import { TbError404Off } from "react-icons/tb";

const Search = () => {
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h6>
            {values?.results?.length < 1 && (
              <>
                <div className="no-products-container">
                  <div className="no-products-message">
                    <h2>No Products Found</h2>
                    <p>
                      Sorry, we couldn't find any products matching your search
                      criteria.
                    </p>
                  </div>
                  <div className="sticker-logo">
                    <TbError404Off />
                  </div>
                </div>
              </>
            )}
          </h6>
          <div className="grid-container">
            {values?.results?.map((p) => (
              <div key={p._id} className="product-link">
                <div className="card">
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
      </div>
    </Layout>
  );
};

export default Search;
