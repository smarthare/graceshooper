import React from "react";
import { connect } from "react-redux";
import store from "../store";
import ProductForm from "./ProductForm";

function Products(props) {
  const { products } = props;
  return (
    <div>
      {products.map(product => (
        <ProductForm product={product} key={product.id} isAddProduct={false} />
      ))}
    </div>
  );
}

const mapStateToProps = state => {
  return { products: state.products };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
