import React from "react";
import { connect } from "react-redux";
import store from "../store";
import Categories from "./Categories";
import Users from "./Users";

function Admin(props) {
  return (
    <div>
      <h1>Admin</h1>
      <Categories />
      <Users />
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
