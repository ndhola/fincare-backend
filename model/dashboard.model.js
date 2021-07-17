const ExpenseSchema = require("../mongo-models/expense");
const IncomeSchema = require("../mongo-models/income");
const ExpenseCategorySchema = require("../mongo-models/expenseCategory");

class DashboardModel {
  static async getAllExpenses(userId) {
    try {
      let expenses = await new ExpenseSchema().expense
        .find({ userId })
        .limit(4);
      return expenses;
    } catch (error) {
      console.error("Error in model getAll Expense", error);
      return null;
    }
  }

  static async getAllIncomes(userId) {
    try {
      let expenses = await new IncomeSchema().income.find({ userId }).limit(4);
      return expenses;
    } catch (error) {
      console.error("Error in model getAll income", error);
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
module.exports = DashboardModel;
