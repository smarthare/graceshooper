import React from "react";
import { connect } from "react-redux";
import store from "../store";
import Categories from "./Categories";
import Users from "./Users";
import ProductDisplay from "./ProductDisplay";
import { Link, Route, NavLink } from "react-router-dom";

export default function Admin(props) {
  return (
    <div>
      <h1>Admin</h1>
      <ul className="nav nav-tabs">
        {["categories", "users", "products", "reviews"].map(title => {
          return (
            <li key={title}>
              <NavLink to={`/admin/${title}`} activeClassName="selected">
                {title.toUpperCase()}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <div>
        <Route path="/admin/categories" component={Categories} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/products" component={ProductDisplay} />
      </div>
    </div>
  );
}
