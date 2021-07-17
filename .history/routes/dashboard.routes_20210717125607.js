const router = require("express").Router();
const DashboardController = require("../controllers/dashboard.controller");

console.log("Inside dashboard routes");
router.get("/", DashboardController.getAllExpenseTotal);

module.exports = router;
