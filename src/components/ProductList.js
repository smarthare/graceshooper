import React from "react";
import Product from "./Product";

export default function ProductList(props) {
  const productList = [
    {
      id: 1,
      title: "iPhone",
      description: "Apple produced smart phone",
      price: "$699",
      quantity: 100,
      category: "phones",
      image: "https://d3nevzfk7ii3be.cloudfront.net/igi/ipv5OG2NckM3DfE2.large"
    },
    {
      id: 2,
      title: "Pixel",
      description: "Google produced smart phone",
      price: "$599",
      quantity: 200,
      category: "phones",
      image: "https://d3nevzfk7ii3be.cloudfront.net/igi/ipv5OG2NckM3DfE2.large"
    }
  ];
  return (
    <div className="col-sm-8">
      <div className="row">
        <h1>Products</h1>
      </div>
      <div className="row">
        {productList.map(product => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
