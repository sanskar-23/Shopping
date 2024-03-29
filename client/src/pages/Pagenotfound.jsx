import React from "react";
import { Link } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout title={"Go Back - Page not found"}>
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <Link to="/">
          <button type="button" className="btn btn-outline-dark">
            Go Back
          </button>
        </Link>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
