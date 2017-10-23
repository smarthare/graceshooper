import React from 'react'
import { connect } from "react-redux"
import { $, subCalc, longDate } from '../util/helper'
import { mapOrderToProduct } from '../util/mapper'
import { cancalOrder } from '../store'

const Order = props => {
  const { order, cancalOrder } = props
  return (
    <div className='panel panel-info'>
      <div className='panel panel-heading'>
        {`Order Placed: ${longDate(order.createdAt)}`}
        <br />
        {`Total Price: ${$(subCalc(order.lineItems))}`}
      </div>
      <div className='panel panel-body'>
        <div className='col-sm-9'>
          {order.status} At {longDate(order.updatedAt)}
          {
            order.lineItems && order.lineItems.map(ln => {
              return (
                <div key={ln.id}>{ln.product.title}</div>
              )
            })
          }
        </div>
        <div className='col-sm-3'>
          <button className='btn btn-primary btn-block'>Buy It Again</button>
          <button className='btn btn-info btn-block'>Write A Review</button>
          <button
            className='btn btn-warning btn-block'
            onClick={cancalOrder.bind(this, order.id)}
          >
          Cancel Order
          </button>
        </div>
      </div>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    order: mapOrderToProduct(ownProps, state.products)
  }
}

const mapDispatch = { cancalOrder }

export default connect(mapState, mapDispatch)(Order)
