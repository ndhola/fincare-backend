/**
 * Author: Dhruv Bharatbhai Patel
 * Banner Id: B00868931
 */
const ExpenseSchema = require("../mongo-models/expense");
const IncomeSchema = require("../mongo-models/income");
const ExpenseCategorySchema = require("../mongo-models/expenseCategory");

class DashboardModel {
  /**
   * Function:- getAllExpenses
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Gets the recent 4 expenses
   */
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

  /**
   * Function:- getAllIncomes
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Gets all incomes details to calcualte total incomes
   */
  static async getAllIncomes(userId) {
    try {
      let incomes = await new IncomeSchema().income.find({ userId }).limit(4);
      return incomes;
    } catch (error) {
      console.error("Error in model getAll income", error);
      return null;
    }
  }

  /**
   * Function:- getAllExpensesDetails
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Gets all incomes details to calcualte total incomes
   */
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
