import React from "react";
import Layout from "../components/Layout/Layout";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get total count of products
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get All products (which is 6) for page 1
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Something Went Wrong");
    }
  };

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <img
        src="/images/background.jpg"
        className="banner-img"
        alt="bannerimage"
        width={"100%"}
      />
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-center">Filter By Category</h4>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <div key={c._id} className="card mb-2 category-card">
                  <div className="card-body">
                    <Checkbox
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  </div>
                </div>
              ))}
            </div>
            <h4 className="text-center mt-4">Filter By Price</h4>
            <div className="d-flex flex-column">
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="price-filter"
              >
                {Prices?.map((p) => (
                  <div key={p._id} className="price-option">
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <div
                className="btn btn-danger mt-3 mb-3"
                onClick={() => window.location.reload()}
              >
                RESET FILTERS
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <h1 className="text-center"> All Products List</h1>
            <div className="grid-container">
              {products?.map((p) => (
                <div className="product-link" key={p._id}>
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
          <div className="mt-3 text-center mb-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
