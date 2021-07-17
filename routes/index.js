const router = require('express').Router();
const userRoutes = require('./user.routes');
const expenseRoutes = require('./expense.routes');
const reportRoutes = require('./report.routes');
const emidatesRoutes = require('./emidates.routes');
const optreportRoutes = require('./optreports.routes');

//user routes
router.use('/user', userRoutes);
router.use('/expense', expenseRoutes);
router.use('/report', reportRoutes);
router.use('/emidates', emidatesRoutes);
router.use('/optreports', optreportRoutes);

module.exports = router;
