const router = require("express").Router();
const DashboardController = require("../controllers/dashboard.controller");

console.log("Inside dashboard routes");
router.get("/:userId", DashboardController.getAllExpensesTotal);
router.get("/expenses/:userId", DashboardController.getAllExpenses);
router.get(
  "/expensesDetails/:userId",
  DashboardController.getAllExpensesDetails
);

module.exports = router;
