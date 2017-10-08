const
  conn = require('../../conn'),
  Product = require('../product/product.model'),
  LineItem = require('./lineItem.model')

const Order = conn.define('order', {
  status: {
    type: conn.Sequelize.STRING,
    defaultValue: 'Created'
  },
  billingAddress: {
    type: conn.Sequelize.STRING,
    // Removing allowNull for test, addresses are not strictly required druing build
    // Validation should be peformed before order submission
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingAddress: {
    type: conn.Sequelize.STRING,
    // See comment above
    // allowNull: false,
    validate: {
      notEmpty: true
    }
  }
}, {
  getterMethods: {
    isCart () {
      return this.status === 'Created'
    }
    // Needs address validation, but only before submit
    // Or should it be handled at business logic?
  }
})

Order.getCartByUserId = function (userId) {
  return Order.findOne({
    where: {isCart: true, userId},
    include: [{ model: LineItem,
      include: [{ model: Product }]
    }]
  })
  .then(order => order || Order.create({userId}))
}

Order.getOrdersByUserId = function (userId) {
  return Order.findAll({
    order: [['id', 'DESC']],
    where: {isCart: true, userId},
    include: [{ model: LineItem,
      include: [{ model: Product }]
    }]
  })
}

Order.addToCartOfUser = function (userId, productId, quantity) {
  quantity = quantity || 1
  return Order.getCartByUserId(userId)
    .then(cart => {
      let lineItem = cart.lineItems.find(el => el.productId === productId)
      if (lineItem) {
        lineItem.quantity += quantity
        return lineItem.save()
      }
      return LineItem.create({
        orderId: cart.id,
        productId,
        quantity
      })
    })
}

Order.destroyLineItem = function (OrderId, LineId) {
  return LineItem.find({where: {id: LineId}})
    .then(lineItem => lineItem.destroy())
}

Order.prototype.submit = function () {
  if (this.status !== 'Created') throw new Error('Only cart can be submitted')
  // This might be a good place to validate address
  this.status = 'Processing'
  return this.save()
}

Order.prototype.cancel = function () {
  this.status = 'Cancelled'
  return this.save()
}

module.exports = Order
