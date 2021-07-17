const router = require("express").Router();
const userRoutes = require("./user.routes");
const expenseRoutes = require("./expense.routes");
const incomeRoutes = require("./income.routes");
const reportRoutes = require("./report.routes");
const dashboardRoutes = require("./dashboard.routes");

//user routes
router.use("/user", userRoutes);
router.use("/expense", expenseRoutes);
router.use("/income", incomeRoutes);
router.use("/report", reportRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
