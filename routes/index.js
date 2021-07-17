const router = require('express').Router()
const emidatesRoutes = require('./emidates.routes')
const optreportRoutes = require('./optreports.routes')
const usersRoutes = require('./users.routes')
const expenseRoutes = require('./expense.routes')
const reportRoutes = require('./report.routes')

//user routes
router.use('/users', usersRoutes)
router.use('/expense', expenseRoutes)
router.use('/report', reportRoutes)
router.use('/emidates', emidatesRoutes)
router.use('/optreports', optreportRoutes)

module.exports = router
