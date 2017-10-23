const
  router = require('express').Router(),
  User = require('../user/user.model')

router
  .get('/me', (req, res, next) => {
    User.findBySessionId(req.session.userId)
    .then(user => res.send(user))
    .catch(next)
  })

  .delete('/', (req, res, next) => {
    req.session.destroy()
    res.sendStatus(204)
  })

  .post('/login', (req, res, next) => {
    User.login(req.body)
    .then(user => {
      req.session.userId = user.id
      res.send(user)
    })
    .catch(next)
  })

  .post('/signup', (req, res, next) => {
    User.signup(req.body)
    .then(user => {
      req.session.userId = user.id
      res.send(user)
    })
    .catch(next)
  })

  .use('/google', require('./google'))

module.exports = router
