import React from "react";
import { connect } from "react-redux";
import store from "../store";
import ProductForm from "./ProductForm";

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { products } = this.props;
    return (
      <div>
        <h3>Product</h3>
        {products.map(product => <ProductForm product={product} />)}
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
