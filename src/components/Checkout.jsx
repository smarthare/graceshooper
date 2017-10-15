import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Cart extends Component {
  constructor () {
    super()
    this.state = {
      readyToSubmit: false
    }
  }

  render () {
    const
      { cart } = this.props,
      subtotal = cart.lineItems.reduce((sum, ln) => {
        sum += ln.quantity * ln.product.price
        return sum
      }, 0),
      TAXRATE = 0.0875

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 panel panel-default backTan'>
            <div className='panel-heading'>
              <h3>Add Address and Stuff</h3>
            </div>
            <div className='panel-body'>
              Address, Payment, Confirmation?
            </div>
          </div>

          <div className='col-sm-4 list-group panel panel-default'>
            <div className='panel-heading btn-checkout text-center'>
              <button className='btn btn-primary' type='submit'>
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
                <div className='col-sm-4 text-right'>{subtotal}</div>
              </div>
              <div className='row'>
                <div className='col-sm-8'>Tax ({TAXRATE})</div>
                <div className='col-sm-4 text-right'>{ subtotal * TAXRATE }</div>
              </div>
              <div className='row h5'>
                <div className='col-sm-8'>Order Total:</div>
                <div className='col-sm-4 text-right'>{ subtotal * (1 + TAXRATE) }</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return { cart: state.cart }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Cart)
