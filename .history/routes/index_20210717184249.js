const router = require("express").Router();
const userRoutes = require("./user.routes");
const expenseRoutes = require("./expense.routes");
const incomeRoutes = require("./income.routes");
const reportRoutes = require("./report.routes");
const dashboardRoutes = require("./dashboard.routes");
const emidatesRoutes = require('./emidates.routes')
const optreportRoutes = require('./optreports.routes')

//user routes
router.use("/user", userRoutes);
router.use("/expense", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/report", reportRoutes);
router.use("/dashboard", dashboardRoutes);
router.use('/emidates', emidatesRoutes)
router.use('/optreports', optreportRoutes)

module.exports = router
