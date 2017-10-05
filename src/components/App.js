import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Navbar from '../containers/NavBar';
import Tests from '../containers/Tests';
import Test from '../containers/Test';

export default function AppContainer() {
  return (
    <div className="container-fluid">
      <h3>Welcome to Grace-Shopper</h3>
      <Route render={ (router) => <Navbar router={ router } /> } />
      <Switch>
      <Route
        path="/tests/:id" render={ (router) => <Test router={ router } /> }
      />
      <Route
        path="/" component={ Tests } />
    </Switch>
    </div>
  )
}
