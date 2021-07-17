const router = require("express").Router();
const DashboardController = require("../controllers/dashboard.controller");

router.get("/", DashboardController.getAllExpenseTotal);

module.exports = router;
