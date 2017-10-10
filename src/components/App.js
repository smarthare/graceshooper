import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchBar from '../containers/SearchBar';
import Account from '../containers/Account';
import Admin from '../containers/Admin';
import Cart from '../containers/Cart';
import Home from '../containers/Home';
import Orders from '../containers/Orders';
import ProductList from '../containers/ProductList';
import UserSignIn from '../containers/User_SignIn';

export default function AppContainer() {
  return (
    <div className="container">
      <Switch>
        <Route path="/category/:id" render={ (router) => <SearchBar router={ router } /> } />
        <Route path="/" render={ (router) => <SearchBar router={ router } /> } />
      </Switch>
      <Switch>
        <Route path="/account" component={ Account } />
        <Route path="/admin" component={ Admin } />
        <Route path="/cart" component={ Cart } />
        <Route path="/orders" component={ Orders } />
        <Route path="/signin" component={ UserSignIn } />
        <Route path="/category/:id" render={ (router) => <ProductList router={ router } /> } />
        <Route path="/" render={ (router) => <Home router={ router } /> } />
      </Switch>
    </div>
  )
}
