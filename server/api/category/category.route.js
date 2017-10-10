const
  router = require('express').Router(),
  Category = require('./category.model')

router
  .get('/', (req, res, next) => {
    Category.getAll()
    .then(categories => res.send(categories))
    .catch(next)
  })

  .get('/:id', (req, res, next) => {
    Category.getCatById(req.params.id)
    .then(category => res.send(category))
    .catch(next)
  })

  .get('/:id/:term', (req, res, next) => {
    Category.getCatByIdTerm(req.params.id, req.params.term)
    .then(category => res.send(category))
    .catch(next)
  })

  //-------- using routes above this line --------------

  .post('/', (req, res, next) => {
    Category.create(req.body)
    .then(res.status(201).json)
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
    .then(res.status(204).end)
    .catch(next)
  })

module.exports = router
