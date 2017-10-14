import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Admin from './Admin'
import SearchBar from '../containers/SearchBar'
import Cart from './Cart'
import Checkout from './Checkout'
import Home from '../containers/Home'
import { Login, Signup } from './AuthForm'
import Account from './User'

import store, { fetchUsers, fetchCategories, fetchProducts } from '../store'

export default class App extends Component {
  componentDidMount () {
    store.dispatch(fetchCategories())
    store.dispatch(fetchUsers())
    store.dispatch(fetchProducts())
  }

  render () {
    return (
      <div className='container-fluid'>
        <Switch>
          <Route path='/category/:id/:term' render={router => <SearchBar router={router} />} />
          <Route path='/category/:id' render={router => <SearchBar router={router} />} />
          <Route path='/' render={router => <SearchBar router={router} />} />
        </Switch>

        <div className='container'>
          <div className='row'>
            <Switch>
              <Route path='/' exact render={router => <Home router={router} />} />
              <Route path='/account' component={Account} />
              <Route path='/admin' component={Admin} />
              <Route path='/cart' component={Cart} />
              <Route path='/signin' component={Login} />
              <Route path='/signup' component={Signup} />
              <Route path='/checkout' component={Checkout} />
              <Route path='/category/:id/:term' render={router => <Home router={router} />} />
              <Route path='/category/:id' render={router => <Home router={router} />} />
            />
            </Switch>
          </div>
        </div>
      </div>
    )
  }
}
