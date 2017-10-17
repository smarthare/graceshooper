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
        <li>
          <NavLink to="/admin/categories" activeClassName="selected">
            CATEGORIES
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" activeClassName="selected">
            USERS
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/products" activeClassName="selected">
            PRODUCTS
          </NavLink>
        </li>
      </ul>
      <div>
        <Route path="/admin/categories" component={Categories} />
        <Route path="/admin/users" component={Users} />
        <Route path="/admin/products" component={ProductDisplay} />
      </div>
    </div>
  );
}
