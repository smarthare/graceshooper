import React from 'react'
import { connect } from 'react-redux'

const ReviewForm = props => {
  const { order } = props
  return (
    <div className='col-md-4 col-md-offset-4'>
      Hello World
      <pre>
        {JSON.stringify(order)}
      </pre>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    order: state.orders.find(order => {
      return order.id === +ownProps.router.match.params.orderId
    })
  }
}

const mapDispatch = ({})

export default connect(mapState, mapDispatch)(ReviewForm)
