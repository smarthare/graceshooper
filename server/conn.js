const
  Sequelize = require('sequelize'),
  pkg = require('../../package.json'),
  name = process.env.DATABASE_URL || pkg.name,
  connection = process.env.DATABASE_URL || `postgres://localhost/${name}`,
  db = new Sequelize(connection, { logging: false }),
  chalk = require('chalk')

console.log(chalk.yellow(`Opening database connection to ${connection}`))

module.exports = db
