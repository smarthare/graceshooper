import React from "react";
import { connect } from "react-redux";
import store from "../store";

class ProductForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Product</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
