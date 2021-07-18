const router = require("express").Router();
const usersRoutes = require("./users.routes");
const expenseRoutes = require("./expense.routes");
const incomeRoutes = require("./income.routes");
const reportRoutes = require("./report.routes");
const dashboardRoutes = require("./dashboard.routes");
const emiCalculator = require('./emicalculator.routes');
const emidatesRoutes = require("./emidates.routes");
const optreportRoutes = require("./optreports.routes");

//user routes
router.use("/users", usersRoutes);
router.use("/expense", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/report", reportRoutes);
router.use("/dashboard", dashboardRoutes);
router.use('/emicalculator', emiCalculator);
router.use("/emidates", emidatesRoutes);
router.use("/optreports", optreportRoutes);

module.exports = router;
