import React from "react";
import Categories from "./Categories";
import { connect } from "react-redux";
import store from "../store";

function Admin(props) {
  return (
    <div>
      <h1>Admin</h1>
      <Categories />
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
