import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { mapOrderToProduct } from '../util/mapper'

const ReviewForm = props => {
  const { order } = props
  if (!order.lineItems || order.lineItems.some(ln => !ln.product)) {
    return (<div>No Order History</div>)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-12 panel panel-default backTan'>
          <div className='panel-heading'>
            <h3>Your Reviews</h3>
          </div>
          <div className='panel-body'>
            <div className='row table-header'>
              <div className='col-sm-3 col-sm-offset-8 text-center'>Rating</div>
            </div>
            <ul className='list-group'>
              {order.lineItems.map((line, idx) => (
                <li className='list-group-item clearfix' key={line.productId}>
                  <div className='col-xs-3 col-sm-2'>
                    <img src={`../../assets/images/${line.product.imgUrls[0]}`} className='responsive-image' />
                  </div>
                  <div className='col-sm-5'>
                    <Link to={`/category/0/?product=${line.productId}`}>
                      <div>{line.product.title}</div>
                    </Link>
                  </div>
                  <div className='col-sm-5 stars'>
                    <form action="">
                    {
                    [5, 4, 3, 2, 1]
                    .map(n => (
                      <span>
                        <input
                          className={`star star-${n}`} id={`star-${n}`}
                          type="radio" name="star" />
                        <label className={`star star-${n}`} for={`star-${n}`}/>
                      </span>
                    ))}
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    order: mapOrderToProduct(
      state.orders.find(order => {
        return order.id === +ownProps.router.match.params.orderId
      }),
      state.products
    )
  }
}

const mapDispatch = ({})

export default connect(mapState, mapDispatch)(ReviewForm)
