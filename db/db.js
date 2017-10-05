const Sequelize = require( 'sequelize' );
const pkg = require('../package.json');
const name = process.env.DATABASE_URL || pkg.name;
const connection = process.env.DATABASE_URL || `postgres://localhost/${name}`;
const db = new Sequelize(connection, { logging: false });
const chalk = require('chalk');

console.log(chalk.yellow(`Opening database connection to ${connection}`));

module.exports = db;
