const ExpenseSchema = require("../mongo-models/expense");
const ExpenseCategorySchema = require("../mongo-models/expenseCategory");

class ExpenseModel {
  static async createExpense(
    title,
    amount,
    dateOfExpense,
    paymentMethod,
    categoryId,
    userId
  ) {
    try {
      await new ExpenseSchema().expense.create({
        title,
        amount,
        dateOfExpense,
        paymentMethod,
        categoryId,
        userId,
      });
      return true;
    } catch (error) {
      console.error("Error in model create Expense", error);
      return false;
    }
  }

  static async editExpense(
    id,
    title,
    amount,
    dateOfExpense,
    paymentMethod,
    categoryId,
    userId
  ) {
    try {
      await new ExpenseSchema().expense.findOneAndUpdate(
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

  static async getAllExpenses(userId) {
    try {
      let expenses = await new ExpenseSchema().expense.find({ userId });
      return expenses;
    } catch (error) {
      console.error("Error in model getAll Expense", error);
      return null;
    }
  }

  static async deleteExpense(expenseId) {
    try {
      await new ExpenseSchema().expense.deleteOne({ _id: expenseId });
      return true;
    } catch (error) {
      console.error("Error in model delete Expense", error);
      return false;
    }
  }

  static async createExpenseCategory(name, userId) {
    try {
      await new ExpenseCategorySchema().expenseCategory.create({
        name,
        userId,
      });
      return true;
    } catch (error) {
      console.error("Error in model create Expense Category", error);
      return false;
    }
  }

  static async getAllExpenseCategories(userId) {
    try {
      const expenseCategories =
        await new ExpenseCategorySchema().expenseCategory.find({ userId });
      return expenseCategories;
    } catch (error) {
      console.error("Error in model getAll Expense Category", error);
      return null;
    }
  }

  /**
   *
   * @param {String} userId
   * @param {Number} startDate
   * @param {Number} endDate
   * @returns
   *
   * Description: Database call for expense data
   */
  static async getExpensesByDateRange(userId, startDate, endDate) {
    try {
      const expenses = await new ExpenseSchema().expense.find({
        userId,
        dateOfExpense: { $gte: startDate, $lte: endDate },
      });
      return expenses;
    } catch (error) {
      console.error("Error in model getExpensesByDateRange", error);
      return null;
    }
  }
}
module.exports = ExpenseModel;
