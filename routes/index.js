const router = require('express').Router()
const usersRoutes = require('./users.routes')
const expenseRoutes = require('./expense.routes')
const reportRoutes = require('./report.routes')

//user routes
router.use('/users', usersRoutes)
router.use('/expense', expenseRoutes)
router.use('/report', reportRoutes)

module.exports = router
