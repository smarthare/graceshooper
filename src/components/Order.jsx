import React from 'react'
import { $, subCalc, longDate } from '../util/helper'

export default props => {
  return (
    <div className='panel panel-info'>
      <div className='panel panel-heading'>
        {`Order Placed: ${longDate(props.createdAt)}
        Total Price: ${$(subCalc(props.lineItems))}`}
      </div>
      <div className='panel panel-body'>
        <div className='col-sm-9'>
          {props.status} At {longDate(props.updatedAt)}
          {
            props.lineItems.map(ln => {
              return (
                <div key={ln.id}>{ln.product.title}</div>
              )
            })
          }
        </div>
        <div className='col-sm-3'>
          <button className='btn btn-primary btn-block'>Buy It Again</button>
          <button className='btn btn-info btn-block'>Write A Review</button>
          <button className='btn btn-warning btn-block'>Cancel Order</button>
        </div>
      </div>
    </div>
  )
}
