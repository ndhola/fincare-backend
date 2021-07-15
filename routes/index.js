const router = require('express').Router();
const userRoutes = require('./user.routes');
const expenseRoutes = require('./expense.routes');

//user routes
router.use('/user', userRoutes);
router.use('/expense', expenseRoutes);

module.exports = router;
