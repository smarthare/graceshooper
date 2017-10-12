import React from "react";
import { Route, Switch } from "react-router-dom";

import Admin from "./Admin";
import SearchBar from "../containers/SearchBar";
import Cart from "../containers/Cart";
import Home from "../containers/Home";
import Orders from "../containers/Orders";
import UserSignIn from "../containers/User_SignIn";
import User from "../components/User";

import store from "../store";
import { fetchUsers } from "../reducers/users";
import { fetchCategories } from "../reducers/categories";
import { fetchProducts } from "../reducers/reducer_products";

export default class App extends React.Component {

  componentDidMount() {
    store.dispatch(fetchCategories());
    store.dispatch(fetchUsers());
    store.dispatch(fetchProducts());
  }

  /*
    There should be a generic products route / search result page that is not restrained to a category

    Let's use /account instead of User. Sounds more realistic

    Let's do one single search result for now

    ***********
    Vince wrote:  Do not change my Home routes.
                  I need to get the params in order to render properly
    2017-10-11
    ***********
  */

  render() {
    return (
      <div className="container-fluid">
        <Switch>
          <Route path="/category/:id/:term" render={router => <SearchBar router={router} />} />
          <Route path="/category/:id" render={router => <SearchBar router={router} />} />
          <Route path="/" render={router => <SearchBar router={router} />} />
        </Switch>

        <Switch>
          <Route path="/account" component={User} />
          <Route path="/admin" component={Admin} />
          <Route path="/cart" component={Cart} />
          <Route path="/orders" component={Orders} />
          <Route path="/signin" component={UserSignIn} />
          <Route path="/category/:id/:term" render={router => <Home router={router} />} />
          <Route path="/category/:id" render={router => <Home router={router} />} />
          <Route path="/" render={router => <Home router={router} />} />
        </Switch>
      </div>
    );
  }
}
