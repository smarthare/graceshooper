const
  conn = require("./conn"),
  User = require("./api/user/user.model"),
  Product = require("./api/product/product.model"),
  Category = require("./api/category/category.model"),
  Order = require("./api/order/order.model"),
  LineItem = require("./api/order/lineItem.model"),
  Review = require("./api/review/review.model");

// Table categoryProduct will be created automatically.
// Since we are not adding any attribute to the join table, it doesn't need to be
// defined
Category.belongsToMany(Product, { through: "categoryProduct" });
Product.belongsToMany(Category, { through: "categoryProduct" });

Order.hasMany(LineItem);
LineItem.belongsTo(Product);
LineItem.belongsTo(Order);

// Associate below allows null foreign key, i.e. order without a user
// This works fine here to deal with guest checkout
User.hasMany(Order)
Order.belongsTo(User)

Product.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Product);

// Need to address the interdependence of the models
// They create a problem when we try to drop them ( during sync )

// const sync = () => conn.sync({ force: true })
const sync = () => conn.sync();

module.exports = {
  sync,
  models: { Product, Category, Order, LineItem, User, Review }
};
