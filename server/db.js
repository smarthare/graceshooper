const
  conn = require('./conn'),
  User = require('./api/user/user.model'),
  Product = require('./api/product/product.model.js'),
  Category = require('./api/category/category.model'),
  Order = require('./api/order/order.model'),
  LineItem = require('./api/order/lineItem.model'),
  Review = require('./api/review/review.model')

Product.hasMany(Category)
Category.belongsTo(Product)

Order.hasMany(LineItem)
LineItem.belongsTo(Product)
LineItem.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Product)

const sync = () => conn.sync({ force: true })

module.exports = {
  sync,
  models: { Product, Category, Order, LineItem, User, Review }
}
