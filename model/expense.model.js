/**
 * Author: Kirtan Revinbhai Dudhatra
 * Banner Id: B00863410
 */
const ExpenseSchema = require("../mongo-models/expense");
const ExpenseCategorySchema = require("../mongo-models/expenseCategory");

class ExpenseModel {
  /**
   * Function:- Create Expense
   * @param title
   * @param amount
   * @param dateOfExpense
   * @param paymentMethod
   * @param categoryId
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for create expense
   */
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

  /**
   * Function:- Edit Expense
   * @param id
   * @param title
   * @param amount
   * @param dateOfExpense
   * @param paymentMethod
   * @param categoryId
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for update expense
   */
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

  /**
   * Function:- Get all Expenses
   * @param userId
   * @returns {Promise<*|null>}
   *
   * Description: Database call for get expense by userId
   */
  static async getAllExpenses(userId) {
    try {
      let expenses = await new ExpenseSchema().expense.find({ userId });
      return expenses;
    } catch (error) {
      console.error("Error in model getAll Expense", error);
      return null;
    }
  }

  /**
   * Function:- Delete Expense
   * @param expenseId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for delete expense by expenseId
   */
  static async deleteExpense(expenseId) {
    try {
      await new ExpenseSchema().expense.deleteOne({ _id: expenseId });
      return true;
    } catch (error) {
      console.error("Error in model delete Expense", error);
      return false;
    }
  }

  /**
   * Function:- Create Expense Category
   * @param name
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for inserting expense category
   */
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

  /**
   * Function:- Get All Expense Categories
   * @param userId
   * @returns {Promise<*|null>}
   *
   * Description: Database call for querying expense category
   */
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
