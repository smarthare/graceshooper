const
  conn = require('./conn'),
  User = require('./api/user/user.model'),
  Product = require('./api/product/product.model.js'),
  Category = require('./api/category/category.model'),
  Order = require('./api/order/order.model'),
  LineItem = require('./api/order/lineItem.model'),
  Review = require('./api/review/review.model')

Category.belongsToMany(Product, { through: 'categoryProduct' })
Product.belongsToMany(Category, { through: 'categoryProduct' })

Order.hasMany(LineItem)
LineItem.belongsTo(Product)
LineItem.belongsTo(Order)

User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Review)
Review.belongsTo(User)
Review.belongsTo(Product)

// Need to address the interdependence of the models
// They create a problem when we try to drop them ( during sync )

const sync = () => conn.sync({ force: true })

module.exports = {
  sync,
  models: { Product, Category, Order, LineItem, User, Review }
}
