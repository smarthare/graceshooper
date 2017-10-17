import React from 'react'
import Products from "./Products";
import ProductForm from "./ProductForm";

export default function ProductDisplay(props){
  return(
    <div>
      <br />
      <h2>Products</h2>
      <ProductForm isAddProduct={true} />
      <Products />
    </div>
  )
}