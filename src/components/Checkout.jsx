import React, { Component } from 'react'
import { connect } from 'react-redux'
import { $, subCalc, validateAddress } from '../util/helper'
import { submitCart, updateUser, fetchOrders } from '../store'

class Checkout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: props.user
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (e) {
    const update = {}
    update[e.target.name] = e.target.value
    this.setState({
      user: { ...this.state.user, ...update }
    })
  }

  handleSubmit (e) {
    const { updateUser, fetchOrders } = this.props
    e.preventDefault()
    updateUser(this.state.user).then(() => fetchOrders())
  }

  render () {
    const
      { cart, submitCart } = this.props,
      { user } = this.state,
      subtotal = subCalc(cart.lineItems),
      TAXRATE = 0.0875,
      readyToSubmit = validateAddress(user) && cart.lineItems.length,
      { handleChange, handleSubmit } = this

    return (
      <div className='container'>
        <div className='row'>

          <div className='col-sm-8'>
            <div className='panel panel-default'>
              <div className='panel-heading'>
                <h3>Add Address and Stuff</h3>
              </div>
              <div className='panel-body'>
                <form onSubmit={handleSubmit} value={user.id}>
                  {[
                    "Address",
                    "City",
                    "State",
                    "ZIP"
                  ].map(attr => {
                    return (
                      <div className="form-group" key={attr}>
                        <label>{`${attr[0].toUpperCase()}${attr.slice(
                          1
                        )}`}</label>
                        <input
                          type="text"
                          className="form-control"
                          name={attr}
                          value={user[attr]}
                          onChange={handleChange}
                        />
                      </div>
                    );
                  })}
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">
                      Update Address
                    </button>
                  </div>
                </form>
                <div />
              </div>
            </div>
          </div>

          <div className='col-sm-4 list-group panel panel-default'>
            <div className='panel-heading btn-checkout text-center'>
              <button className='btn btn-primary' onClick={submitCart} disabled={!readyToSubmit}>
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
              <hr />
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
const mapDispatch = ({ updateUser, fetchOrders, submitCart })

export default connect(mapState, mapDispatch)(Checkout)
