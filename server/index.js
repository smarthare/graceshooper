const
  express = require('express'),
  app = express(),
  path = require('path'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  routes = require('./routes/api'),
  db = require('./db'),
  port = process.env.PORT || 2020

app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use('/public', express.static(path.join(__dirname, '/public')))
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/api', routes)

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'public/index.html')))

app.use((req, res, next) => {
  const error = new Error('page not found')
  error.status = 404
  next(error)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err)
})

db.sync()
.then(() => db.seed())
.then(data => {
  console.log('db synced')
  app.listen(port, () => console.log((`listening on port ${port}`)))
})

module.exports = app
