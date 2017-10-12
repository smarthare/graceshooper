import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = (props) => {
  const { cart } = props
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

        <div className='col-sm-4 panel panel-default backTan'>
          <h4>Subtotal: </h4>
          <button className='btn btn-primary' type='submit'>
            Place Order
          </button>
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
