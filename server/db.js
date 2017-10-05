const db = require( './db' )
const Test = require( './Test' );

const sync = () => db.sync({force: true});

const seed = () => {
  return sync()
    .then(() => {
      const promiseArr = [
        Test.create({ name: 'AJ Frank' }),
        Test.create({ name: 'Di Fan' }),
        Test.create({ name: 'Vince Rios' })
      ]
      return Promise.all(promiseArr);
    }
  )
};

module.exports = { seed, sync, models: { Test } };
