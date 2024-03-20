import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group">
        <h4
          className="mb-4"
          style={{
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#333",
            borderBottom: "2px solid #ccc",
            paddingBottom: "10px",
          }}
        >
          Admin Panel
        </h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Create Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Create Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Products
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/users"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Users
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
