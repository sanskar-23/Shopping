import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster
          toastOptions={{
            className: "",
            duration: 1800,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              // duration: 1800,
              theme: {
                primary: "green",
                secondary: "black",
              },
            },
          }}
        />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Shopping - shop now",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb",
  author: "Sanskar",
};

export default Layout;
