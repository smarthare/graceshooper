const conn = require('../../conn');


const Category = conn.define('category', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true,
    allowNull: false,
    set(val) {
      this.setDataValue('name', `${val[0].toUpperCase()}${val.slice(1)}`);
    }
  }
};

module.exports = Category
