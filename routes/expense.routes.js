/**
 * Author: Kirtan Revinbhai Dudhatra
 * Banner Id: B00863410
 */
const router = require('express').Router();
const ExpenseController = require('../controllers/expense.controller');

router.post('/createExpenseCategory', ExpenseController.createExpenseCategory);
router.post('/', ExpenseController.createExpense);
router.put('/:id', ExpenseController.editExpense);
router.get('/getAllExpenseCategory/:userId', ExpenseController.getAllExpenseCategory);
router.get('/:userId', ExpenseController.getAllExpense);
router.delete('/:expenseId', ExpenseController.deleteExpense);

module.exports = router;