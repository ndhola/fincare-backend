const ExpenseSchema = require("../mongo-models/expense");
const ExpenseCategorySchema = require("../mongo-models/expenseCategory");

class DashboardModel {
  static async getAllExpenses(userId) {
    try {
      let expenses = await new ExpenseSchema().expense
        .find({ userId })
        .limit(1);
      return expenses;
    } catch (error) {
      console.error("Error in model getAll Expense", error);
      return null;
    }
  }

  static async getAllExpensesDetails(userId) {
    try {
      let expenses = await new ExpenseSchema().expense.find({ userId });
      return expenses;
    } catch (error) {
      console.error("Error in model getAll Expense", error);
      return null;
    }
  }
}
