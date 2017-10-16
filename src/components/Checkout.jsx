import React, { Component } from 'react'
import { connect } from 'react-redux'
import { $ } from '../util/helper'
import { deleteLnFromCart } from '../store'

class Checkout extends Component {
  constructor () {
    super()
    this.state = {
      readyToSubmit: false
    }
  }

  render () {
    const
      { cart, user } = this.props,
      { readyToSubmit } = this.state,
      subtotal = cart.lineItems.reduce((sum, ln) => {
        sum += ln.quantity * ln.product.price
        return sum
      }, 0),
      TAXRATE = 0.0875

    return (
      <div className='container'>
        <div className='row'>

          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h3>Add Address and Stuff</h3>
              </div>
              <div className='panel-body'>
                <ol>
                  <li className='list-group-item'>Address: {user.shipAddress}</li>
                  <li className='list-group-item'>City: {user.shipCity}</li>
                  <li className='list-group-item'>State: {user.shipState}</li>
                  <li className='list-group-item'>Zip: {user.shipZip}</li>
                </ol>
                <div>
                  Address
                </div>
              </div>
            </div>
          </div>

          <div className='col-sm-4 list-group panel panel-default'>
            <div className='panel-heading btn-checkout text-center'>
              <button className='btn btn-primary' type='submit' disabled={!readyToSubmit}>
              Place Your Order
              </button>
              <div>
              By placing your order, you agree to graceshopper's privacy notice and conditions of use.
              </div>
            </div>

            <div className='panel-body'>
              <h4>Order Summary </h4>
              <div className='row'>
                <div className='col-sm-8'>Items</div>
                <div className='col-sm-4 text-right'>{$(subtotal)}</div>
              </div>
              <div className='row'>
                <div className='col-sm-8'>Tax ({TAXRATE})</div>
                <div className='col-sm-4 text-right'>{$(subtotal * TAXRATE)}</div>
              </div>
              <div className='row h5'>
                <div className='col-sm-8'>Order Total:</div>
                <div className='col-sm-4 text-right'>{$(subtotal * (1 + TAXRATE))}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

const mapState = state => ({ cart: state.cart, user: state.currentUser })
const mapDispatch = dispatch => ({deleteLine: deleteLnFromCart})

export default connect(mapState, mapDispatch)(Checkout)
