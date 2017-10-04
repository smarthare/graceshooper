const express = require( 'express' );
const router = express.Router();

const testRoutes = require( './test_routes' );

router.use('/tests', testRoutes);

module.exports = router;
