import React from "react";
import { Route, Switch } from "react-router-dom";

// Let's settle on a list of component names
// import ProductList from "./ProductList";
// import User from "./User";
import Admin from "./Admin";
import SearchBar from '../containers/SearchBar';
import Account from '../containers/Account';
// import Admin from '../containers/Admin';
import Cart from '../containers/Cart';
import Home from '../containers/Home';
import Orders from '../containers/Orders';
import ProductList from '../containers/ProductList';
import Product from '../containers/Product';
import UserSignIn from '../containers/User_SignIn';

import store from "../store";
import { fetchUsers } from "../reducers/users";
import { fetchCategories } from "../reducers/categories";

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    store.dispatch(fetchCategories());
    store.dispatch(fetchUsers());
  }

  // There should be a generic products route / search result page that
  // is not restrainted to a category
  // Let's use /account instead of User. Sounds more realistic
  render() {
    return (
      <div className="container-fluid">
        <h3>Welcome to Grace-Shopper</h3>
        <Switch>
          <Route path="/category/:id" render={ (router) => <SearchBar router={ router } /> } />
          <Route path="/" render={ (router) => <SearchBar router={ router } /> } />
        // <Route path="/category/:id/:term" render={ (router) => <SearchBar router={ router } /> } />
          <Route path="/product/:id" render={ (router) => <SearchBar router={ router } /> } />
      </Switch>
        </Switch>
    

        <Switch>
          <Route path="/account" component={ Account } />
          <Route path="/admin" component={ Admin } />
          <Route path="/cart" component={ Cart } />
          <Route path="/orders" component={ Orders } />
          <Route path="/signin" component={ UserSignIn } />
          <Route path="/products" component={ProductList} />
          // Let's do one single search result for now
          <Route path="/category/:id/:term" render={ (router) => <ProductList router={ router } /> } />
          <Route path="/category/:id" render={ (router) => <ProductList router={ router } /> } />
          <Route path="/product/:id" render={ (router) => <Product router={ router } /> } />
          <Route path="/category/:id" render={ (router) => <ProductList router={ router } /> } />
          <Route path="/" render={ (router) => <Home router={ router } /> } />
        </Switch>
      </div>
  )

    );
  }
}
