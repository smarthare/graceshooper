import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SearchBar from '../containers/SearchBar';
import Home from '../containers/Home';

export default function AppContainer() {
  return (
    <div className="container">
      <Switch>
        <Route path="/category/:id" render={ (router) => <SearchBar router={ router } /> } />
        <Route path="/" component={ SearchBar } />
      </Switch>
      <Switch>
      <Route path="/category/:id" render={ (router) => <Home router={ router } /> } />      
        <Route path="/" component={ Home } />
      </Switch>
    </div>
  )
}
