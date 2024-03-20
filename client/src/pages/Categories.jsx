import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  const categoryCardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "calc(33.333% - 20px)",
    margin: "10px",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    position: "relative",
    backgroundColor: "#fff",
  };

  const overlayStyle = {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)",
    opacity: "0.7",
    transition: "opacity 0.3s ease-in-out",
    zIndex: "0",
  };

  const contentStyle = {
    zIndex: "1",
    padding: "20px",
    color: "#fff",
    position: "relative",
    textAlign: "center",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#000",
    display: "block",
  };

  const categoryNameStyle = {
    fontSize: "24px",
    marginBottom: "10px",
  };

  return (
    <Layout title={"All Categories"}>
      <div
        className="categories-container mt-4"
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {categories.map((c) => (
          <div className="category-card" key={c._id} style={categoryCardStyle}>
            <Link
              to={`/category/${c.slug}`}
              className="category-link"
              style={linkStyle}
            >
              <div className="category-overlay" style={overlayStyle}></div>
              <div className="category-content" style={contentStyle}>
                <h2 className="category-name" style={categoryNameStyle}>
                  {c.name}
                </h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Categories;
