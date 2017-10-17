const
  Sequelize = require('sequelize'),
  name = process.env.DATABASE_URL || require('../package.json').name,
  connection = process.env.DATABASE_URL || `postgres://localhost:5432/${name}`,
  conn = new Sequelize(connection, {
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 20000,
      acquire: 20000
    }})

console.log(require('chalk').yellow(`Opening database connection to ${connection}`))

module.exports = conn
