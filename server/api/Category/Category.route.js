const
  router = require('express').Router(),
  Category = require('./category.models')

router
  .get('/', (req, res, next) => {
    Category.findAll({ order: ['id'] })
    .then(res.json)
    .catch(next)
  })

  .post('/', (req, res, next) => {
    Category.create(req.body)
    .then(res.json)
    .catch(next)
  })

  .put('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => category.update(req.body))
    .then(res.json)
    .catch(next)
  })

  .delete('/:id', (req, res, next) => {
    Category.findById(req.params.id)
    .then(category => category.destroy())
    .then(res.json)
    .catch(next)
  })

module.exports = router
