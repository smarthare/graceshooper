import React from "react";
import { connect } from "react-redux";
import store from "../store";
import Categories from "./Categories";
import Users from "./Users";
import Products from "./Products";

//to do - build product form so we can display and adjust products

function Admin(props) {
  return (
    <div>
      <h1>Admin</h1>
      <Categories />
      <Users />
      <Products />
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
