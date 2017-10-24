import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { $, subCalc } from '../util/helper'
import { mapOrderToProduct } from '../util/mapper'
import { deleteLnFromCart } from '../store'

// Link to single product from cart line does not work yet

class Cart extends Component {
  constructor () {
    super()
  }

  handleDelete (idx) {
    const { cart, deleteLine } = this.props
    deleteLine(cart.lineItems[idx])
  }

  render () {
    const
      { cart, currentUser } = this.props,
      subtotal = subCalc(cart.lineItems),
      count = cart.lineItems.length,
      readyToCheckOut = currentUser.id && count > 0

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 panel panel-default backTan'>
            <div className='panel-heading'>
              <h3>Shopping Cart</h3>
            </div>
            <div className='panel-body'>
              <div className='row table-header'>
                <div className='col-sm-3 col-sm-offset-7'>Price</div>
                <div className='col-sm-2'>Quantity</div>
              </div>
              <ul className='list-group table-rows'>
                {cart.lineItems.map((line, idx) => (
                  <li className='list-group-item clearfix' key={line.productId}>
                    <div className='col-xs-3 col-sm-2'>
                      <img src={`../../assets/images/${line.product.imgUrls[0]}`} className='responsive-image' />
                    </div>
                    <div className='col-sm-5'>
                      <Link to={`/category/0/?product=${line.productId}`}>
                        <div>{line.product.title}</div>
                      </Link>
                      <div>{line.product.inventory < line.quantity ? 'Out of Stock' : 'In Stock'}</div>
                      <button className='btn btn-danger' onClick={this.handleDelete.bind(this, idx)}>Delete</button>
                    </div>
                    <div className='col-sm-2'>{$(line.product.price)}</div>
                    <div className='col-sm-3 text-right'>{line.quantity}</div>
                  </li>
                ))}
              </ul>
              <div className='row table-subtotal'>
                <div className='col-sm-4 col-sm-offset-8 text-right'>
                  Subtotal ({count} items): {$(subtotal)}
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-4 panel panel-default backTan'>
            <div className='panel-heading'>
              <h4>Subtotal: {$(subtotal)}</h4>
            </div>
            <div className='panel-body'>
              <Link to={`/checkout`}>
                <button className='btn btn-primary' type='submit' disabled={!readyToCheckOut}>
                  Proceed to Checkout
                </button>
              </Link>

              { !currentUser.id && count > 0 &&
                (

                <div>
                  <hr />
                  <h4>Sorry! Only registered user can checkout.</h4>
                  <Link to={`/signin`}>
                    <button className='btn btn-info'>
                      Already has an account? Log In
                    </button>
                  </Link>
                  <Link to={`/signup`}>
                    <button className='btn btn-default'>
                      Sign up for a new account
                    </button>
                  </Link>
                </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  cart: mapOrderToProduct(state.cart, state.products),
  currentUser: state.currentUser
})
const mapDispatch = ({ deleteLine: deleteLnFromCart })

export default connect(mapState, mapDispatch)(Cart)
