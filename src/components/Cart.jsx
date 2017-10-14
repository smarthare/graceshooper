import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { } from '../store'

const Cart = (props) => {
  const
    { cart } = props
    // subtotal = cart.lineItems.reduce((sum, ln))

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-8 panel panel-default backTan'>
          <div className='panel-heading'>
            <h3>Shopping Cart</h3>
          </div>
          <div className='panel-body'>
            <ul className='list-group'>
              {cart.lineItems.map((line, idx) => (
                <li className='list-group-item clearfix' key={idx}>
                  {JSON.stringify(line)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='col-sm-4 panel panel-default backTan'>
          <h4>Subtotal: </h4>
          <Link to={`/checkout`}>
            <button className='btn btn-primary' type='submit'>
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapState = state => {
  return { cart: state.cart }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
