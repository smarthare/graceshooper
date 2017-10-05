const
  router = require('express').Router(),
  Category = require('./category.model')

router
  .get('/', (req, res, next) => {
    Category.findAll({ order: ['id'] })
    .then(res.status(200).json)
    .catch(next)
  })

  .post('/', (req, res, next) => {
    Category.create(req.body)
    .then(res.status(201).json)
    .catch(next)
  })

  .put('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => category.update(req.body))
    .then(res.status(200).json)
    .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(res.status(204).end)
    .catch(next)
  })

module.exports = router
