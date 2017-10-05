const express = require( 'express' );
const router = express.Router();
const db = require( '../db' );
const models = db.models;

// ***** Test Route *****

router.get('/', (req, res, next) => {
  models.Test.findAll({ order: ['name'] })
    .then(tests => {
      res.send(tests);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  models.Test.findById(req.params.id)
    .then(test => {
      res.send(test);
    })
    .catch(next);
});

router.post('/', (req, res, next) => {
  models.Test.create({
    name: req.body.name,
  })
    .then(test => {
      res.send(test);
    })
    .catch(next);
});

router.put('/:id', (req, res, next) => {
  models.Test.findById(req.params.id * 1)
    .then(test => {
      test.name =  req.body.name;
      return test.save();
    })
    .then(test => {
      res.send(test);
    })
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  models.Test.destroy({ where: { id: req.params.id * 1 } })
    .then(() => res.sendStatus(204))
});

module.exports = router;
