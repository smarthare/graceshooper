import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import store, { fetchOrders, fetchCart } from '../store'

// to do: make user editable
// to do: add address
class User extends Component {
  constructor () {
    super()
  }

  componentDidMount () {
    store.dispatch(fetchOrders())
    store.dispatch(fetchCart())
  }

  render () {
    const { cart, orders, currentUser } = this.props
    const user = currentUser

    // loading state
    if (!user) return <h1>Loading...</h1>

    return (
      <div>
        <h1>User Information</h1>
        <div className='row'>
          <div className='col-xs-4'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h2>Account Info</h2>
              </div>
              <div className='panel-body'>
                <img src={user.imgUrl} />
                <ul className='list-group'>
                  <li className='list-group-item'>Name: {user.name}</li>
                  <li className='list-group-item'>Email: {user.email}</li>
                  <li className='list-group-item'>Phone: {user.phone}</li>
                  <li className='list-group-item'>Address: {user.shipAddress}</li>
                  <li className='list-group-item'>City: {user.shipCity}</li>
                  <li className='list-group-item'>State: {user.shipState}</li>
                  <li className='list-group-item'>Zip: {user.shipZip}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className='col-xs-7'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h2>Order History</h2>
              </div>
              <div className='panel-body'>
                <ul className='list-group'>
                  {
                    orders.map(order => JSON.stringify(order))
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users,
    orders: state.orders,
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => {
  // Will dispatch EditUserDetail kinda reducer
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(User)
