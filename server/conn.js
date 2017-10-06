const
  Sequelize = require('sequelize'),
  name = process.env.DATABASE_URL || require('../package.json').name,
  connection = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`,
  db = new Sequelize(connection, { logging: false })

console.log(require('chalk').yellow(`Opening database connection to ${connection}`))

module.exports = db
