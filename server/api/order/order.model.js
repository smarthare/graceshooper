const
  conn = require('../../conn'),
  Product = require('../product/product.model'),
  LineItem = require('./lineItem.model')

const Order = conn.define('order', {
  status: {
    type: conn.Sequelize.ENUM('Created', 'Processing', 'Cancelled', 'Completed'),
    defaultValue: 'Created'
  },
  billingAddress: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shippingAddress: {
    type: conn.Sequelize.STRING,
    allowNull: false,
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

Order.getCart = function () {
  return Order.findOne({
    where: {isCart: true},
    include: [{ model: LineItem,
      include: [{ model: Product }]
    }]
  })
  .then(order => order || Order.create())
}

Order.getOrders = function () {
  return Order.findAll({
    order: [['id', 'DESC']],
    where: {isCart: false},
    include: [{ model: LineItem,
      include: [{ model: Product }]
    }]
  })
}

Order.submitCart = function () {
  Order.getCart()
  .then(cart => {
    cart.status = 'Processing'
    return cart.save()
  })
}

Order.addToCart = function (productId, quantity) {
  quantity = quantity || 1
  return Order.getCart()
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

Order.prototype.cancel = function () {
  this.status = 'Cancelled'
  return this.save()
}

module.exports = Order
