import React from "react";
import { connect } from "react-redux";
import store from "../store";

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    console.log(products);
    return (
      <div>
        <h3>Product</h3>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { products: state.products };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
