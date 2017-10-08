import React from "react";
import { Route } from "react-router-dom";

import Navbar from "../containers/NavBar";
import Tests from "../containers/Tests";
import Test from "../containers/Test";
import ProductList from "./ProductList";
import User from "./User";

import store from "../store";
import { fetchUsers } from "../reducers/users";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(fetchUsers());
  }

  render() {
    return (
      <div className="container-fluid">
        <h3>Welcome to Grace-Shopper</h3>
        <Route render={router => <Navbar router={router} />} />
        <Route path="/products" component={ProductList} />
        <User />
      </div>
    );
  }
}
