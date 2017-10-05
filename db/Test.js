const db = require( './db' );

const defineAttr = {
  name: {
    type: db.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
};

const defineOptions = {};

const Test = db.define('test', defineAttr, defineOptions);

module.exports = Test;
