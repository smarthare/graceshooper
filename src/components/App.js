import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "../containers/NavBar";
import Tests from "../containers/Tests";
import Test from "../containers/Test";
import ProductList from "./ProductList";

export default function App() {
  return (
    <div className="container-fluid">
      <h3>Welcome to Grace-Shopper</h3>
      <Route render={router => <Navbar router={router} />} />
      <ProductList />
    </div>
  );
}
