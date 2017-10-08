const router = require("express").Router(),
  Order = require("./order.model");

router
  .get("/", (req, res, next) => {
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
    // Order submission
    Order.submitCartByUserId(req.session.userId)
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

  .post("/:id/lineItems", (req, res, next) => {
    Order.addToCartOfUser(
      req.session.userId,
      req.body.productId,
      req.body.quantity
    )
      .then(order => res.send(order))
      .catch(next);
  })

  .delete("/:orderId/lineItems/:id", (req, res, next) => {
    Order.destroyLineItem(req.params.orderId, req.params.id)
      // Expect nothing from response here
      .then(result => res.send(result))
      .catch(next);
  })



module.exports = router;
