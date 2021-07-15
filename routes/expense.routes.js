const router = require('express').Router();
const ExpenseControler = require('../controllers/expense.controller');

router.post('/createExpenseCategory', ExpenseControler.createExpenseCategory);
router.post('/', ExpenseControler.createExpense);
router.put('/:id', ExpenseControler.editExpense);
router.get('/getAllExpenseCategory/:userId', ExpenseControler.getAllExpenseCategory);
router.get('/:userId', ExpenseControler.getAllExpense);
router.delete('/:expenseId', ExpenseControler.deleteExpense);

module.exports = router;