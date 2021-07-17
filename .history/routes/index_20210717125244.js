const router = require("express").Router();
const userRoutes = require("./user.routes");
const expenseRoutes = require("./expense.routes");
const reportRoutes = require("./report.routes");

//user routes
router.use("/user", userRoutes);
router.use("/expense", expenseRoutes);
router.use("/report", reportRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
