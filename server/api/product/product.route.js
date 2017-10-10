const
  router = require('express').Router(),
  Product = require('./product.model'),
  Category = require('../category/category.model.js'),
  Review = require('../review/review.model.js')

router
  .get('/', (req, res, next) => {
    Product.findAll({ order: ['name'], include: [ Category, Review ] })
    .then(res.json)
    .catch(next)
  })

  .post('/', (req, res, next) => {
    Product.create(req.body, { include: [ Category ] })
    .then(res.status(201).json)
    .catch(next)
  })

  .put('/:id', (req, res, next) => {
    Product.findById(req.params.id, { include: [ Category ] })
    .then(product => product.update(req.body))
    .then(res.json)
    .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Product.findById(req.params.id, { include: [ Category ] })
    .then(product => product.destroy())
    .then(res.status(204).end)
    .catch(next)
  })

module.exports = router
