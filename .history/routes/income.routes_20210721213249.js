/**
 * Author: Dhruv Bharatbhai Patel
 * Banner Id: B00868931
 */
const router = require("express").Router();
const IncomeController = require("../controllers/income.controller");

router.post("/createIncomeCategory", IncomeController.createIncomeCategory);
router.post("/", IncomeController.createIncome);
router.put("/:id", IncomeController.editIncome);
router.get(
  "/getAllIncomeCategory/:userId",
  IncomeController.getAllIncomeCategory
);
router.get("/:userId", IncomeController.getAllIncome);
router.delete("/:incomeId", IncomeController.deleteIncome);

module.exports = router;
