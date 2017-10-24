import React from 'react'
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import { $, subCalc, longDate } from '../util/helper'
import { mapOrderToProduct } from '../util/mapper'
import { cancalOrder, mergeCart } from '../store'

const Order = props => {
  const { order, mergeCart, cancalOrder } = props
  if (!order.lineItems) return (<div>No Order History</div>)
  if (order.lineItems.some(ln => !ln.product)) return (<div>Loading...</div>)

  return (
    <div className='panel panel-info'>
      <div className='panel panel-heading'>
        {`Order Placed: ${longDate(order.createdAt)}`}
        <br />
        {`Total Price: ${$(subCalc(order.lineItems))}`}
      </div>
      <div className='panel panel-body'>
        <div className='col-sm-9'>
          <strong>{order.status} At {longDate(order.updatedAt)}</strong>
          {
            order.lineItems && order.lineItems.map(ln => {
              return (
                <div key={ln.id}>{ln.product.title}</div>
              )
            })
          }
        </div>
        <div className='col-sm-3'>
          <button
            className='btn btn-primary btn-block'
            onClick={mergeCart.bind(this, order.lineItems)}
          >
            Buy It Again
          </button>
          <Link to={`/review/${order.id}`}>
            <button className='btn btn-info btn-block'>
              Write A Review
            </button>
          </Link>
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

const mapDispatch = { mergeCart, cancalOrder }

export default connect(mapState, mapDispatch)(Order)
