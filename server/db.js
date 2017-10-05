const
  conn = require('./conn'),
  Product = require('./product/product.model'),
  Category = require('./category/category.model'),
  Order = require('./order/order.model'),
  LineItem = require('./order/lineItem.model'),
  User = require('./user/user.model'),
  Review = require('./review/review.model')

Product.hasMany(Category)
Category.belongsTo(Product)

LineItem.belongsTo(Product)
LineItem.belongsTo(Order)
Order.hasMany(LineItem)

User.hasMany(Order)
Order.belongsTo(User)

Review.belongsTo(Product)
Review.belongsTo(User)
Product.hasMany(Review)
User.hasMany(Review)

const sync = () => conn.sync({ force: true })
const seed = () => {
  // return sync()
  //   .then(() => {
  //     const promiseArr = [
  //       Test.create({ name: 'AJ Frank' }),
  //       Test.create({ name: 'Di Fan' }),
  //       Test.create({ name: 'Vince Rios' })
  //     ]
  //     return Promise.all(promiseArr)
  //   }
  // )
}

module.exports = {
  seed,
  sync,
  models: { Product, Category, Order, LineItem, User }
}
