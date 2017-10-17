const router = require("express").Router(),
  Order = require("./order.model");

router
  .get("/", (req, res, next) => {
    Order.findAll()
      .then(orders => res.send(orders))
      .catch(next);
  })
  .get("/currentUser", (req, res, next) => {
    Order.getOrdersByUserId(req.session.userId)
      .then(orders => res.send(orders))
      .catch(next);
  })
  .get("/cart", (req, res, next) => {
    Order.getCartByUserId(req.session.userId)
      .then(cart => res.send(cart))
      .catch(next);
  })
  .put("/", (req, res, next) => {
    Order.getCartByUserId(req.session.userId)
      .then(cart => cart.submit())
      .then(order => res.send(order))
      .catch(next);
  })
  .post("/", (req, res, next) => {
    // To create a cart from request body
    // i.e. when a guest signup
    // Placeholding - creating an order from store can be more
    //   complicated than using req.body. Might need to first
    //   add all lineItems one by one
    Order.create(req.body)
      .then(order => res.send(order))
      .catch(next);
  })
  .post("/lineItems", (req, res, next) => {
    const { productId, quantity } = req.body;
    Order.getCartByUserId(req.session.userId)
      .then(cart => cart.addProdToCart(productId, quantity))
      .then(lineItem => res.send(lineItem))
      .catch(next);
  })
  .delete("/lineItems/:id", (req, res, next) => {
    Order.destroyLineItem(req.params.id)
      .then(result => res.send(result))
      .catch(next);
  });

module.exports = router;
