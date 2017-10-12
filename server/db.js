const conn = require('./conn'),
  User = require('./api/user/user.model'),
  Product = require('./api/product/product.model'),
  Category = require('./api/category/category.model'),
  Order = require('./api/order/order.model'),
  LineItem = require('./api/order/lineItem.model'),
  Review = require('./api/review/review.model')

Category.belongsToMany(Product, { through: 'CategoryProduct' })
Product.belongsToMany(Category, { through: 'CategoryProduct' })

Order.hasMany(LineItem)
LineItem.belongsTo(Product)
LineItem.belongsTo(Order)

// Associate below allows null foreign key, i.e. order without a user
// This works fine here to deal with guest checkout
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
