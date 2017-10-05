const
  router = require('express').Router(),
  Product = require('./product.models')

router
  .get('/', (req, res, next) => {
    Product.findAll({ order: ['id'] })
    .then(res.status(200).json)
    .catch(next)
  })

  .post('/', (req, res, next) => {
    Product.create(req.body)
    .then(res.status(201).json)
    .catch(next)
  })

  .put('/:id', (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => product.update(req.body))
    .then(res.status(200).json)
    .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Product.findById(req.params.id)
    .then(product => product.destroy())
    .then(res.status(204).end)
    .catch(next)
  })

module.exports = router
