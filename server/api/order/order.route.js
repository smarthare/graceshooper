const router = require("express").Router(),
  Order = require("./order.model");

router.get("/:id", (req, res, next) => {
  Order.getOrdersByUserId(req.params.id)
    .then(response => res.send(response))
    .catch(next);
});
//   .get('/', (req, res, next) => {
//     Product.findAll({ order: ['id'] })
//     .then(res.json)
//     .catch(next)
//   })

//   .post('/', (req, res, next) => {
//     Product.create(req.body)
//     .then(res.json)
//     .catch(next)
//   })

//   .put('/:id', (req, res, next) => {
//     Product.findById(req.params.id)
//     .then(product => product.update(req.body))
//     .then(res.json)
//     .catch(next)
//   })

//   .delete('/:id', (req, res, next) => {
//     Product.findById(req.params.id)
//     .then(product => product.destroy())
//     .then(res.json)
//     .catch(next)
//   })

module.exports = router;
