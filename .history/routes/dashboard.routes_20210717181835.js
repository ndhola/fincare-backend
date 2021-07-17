const router = require("express").Router();
const DashboardController = require("../controllers/dashboard.controller");

console.log("Inside dashboard routes");
router.get("/expensesTotal/:userId", DashboardController.getAllExpensesTotal);
router.get("/incomesTotal/:userId", DashboardController.getAllIncomesTotal);
router.get("/savings/:userId", DashboardController.getSavings);
router.get("/expenses/:userId", DashboardController.getAllExpenses);
router.get("/incomes/:userId", DashboardController.getAllIncomes);
router.get(
  "/expensesDetails/:userId",
  DashboardController.getAllExpensesDetails
);

module.exports = router;
