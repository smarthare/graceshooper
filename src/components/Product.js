import React from "react";
import { Link } from "react-router-dom";

export default function Product(props) {
  const { id, title, description, price, quantity, image } = props.product;
  return (
    <div className="col-md-3 col-xs-6">
      <Link to={`/product/${id}`} className="thumbnail">
        <img src={image} />
      </Link>
      <div className="caption">
        <h3>{title}</h3>
        <p>{description}</p>
        <p>Price: {price}</p>
        <p>
          Select Quantity <input />
        </p>
        <button className="btn btn-default">Add to cart </button>
      </div>
    </div>
  );
}
