import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
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
          Dashboard
        </h4>
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action rounded-pill mb-2 py-3 text-dark"
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
