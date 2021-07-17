const ExpenseSchema = require("../mongo-models/expense");
const ExpenseCategorySchema = require("../mongo-models/expenseCategory");

class DashboardModel {
  static async calculateExpense() {
    try {
      await new ExpenseSchema().expense.find(
        { _id: id },
        {
          title,
          amount,
          dateOfExpense,
          paymentMethod,
          categoryId,
          userId,
        }
      );
      return true;
    } catch (error) {
      console.error("Error in model edit Expense", error);
      return false;
    }
  }
}
