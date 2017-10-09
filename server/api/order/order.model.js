const
  conn = require('../../conn'),
  Product = require('../product/product.model'),
  Category = require('../category/category.model.js'),
  LineItem = require('./lineItem.model')

const Order = conn.define('order', {
  // Status should have four options:
  //   Created, Processing, Cancelled, Completed.
  // Each user should only have one order that is 'Created', i.e. the Cart
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
})

Order.getCartByUserId = function (userId) {
  return Order.findOne({
    where: {status: 'Created', userId},
    include: [{ model: LineItem,
      include: [{ model: Product }]
    }]
  })
  .then(order => order || Order.create({userId}))
}

Order.getOrdersByUserId = function (userId) {
  return Order.findAll({
    order: [['id', 'DESC']],
    where: {status: {$ne: 'Created'}, userId},
    include: [{ model: LineItem,
      include: [{ model: Product }]
    }]
  })
}

Order.addToCartOfUser = function (userId, productId, quantity) {
  quantity = quantity || 1
  return Order.getCartByUserId(userId)
    .then(cart => {
      let lineItem = cart.lineItems && cart.lineItems.find(el => el.productId === productId)
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
  if (!this.lineItems) throw new Error('Cannot submit empty cart')

  return Promise.all(this.lineItems.map(line => {
    // Submitting order reduce inventory and freezes order prices
    Product.findById(line.productId, { include: [ Category ] })
    .then(product => {
      product.inventory = product.inventory - line.quantity
      return product.save()
    })
    .then(product => line.update({price: product.price}))
  }))
  .then(() => this.update({ status: 'Processing' }))
}

Order.prototype.cancel = function () {
  this.status = 'Cancelled'
  return this.save()
}

module.exports = Order
