/**
 * Author: Dhruv Bharatbhai Patel
 * Banner Id: B00868931
 */
const Exception = require("../lib/exceptions");
const ExpenseModel = require("../model/expense.model");
const IncomeModel = require("../model/income.model");
const DashboardModel = require("../model/dashboard.model");

class DashboardController {
  /**
   * Function: getAllExpensesTotal
   * Url Parameters: userId
   */
  static async getAllExpensesTotal(req, res) {
    try {
      const { userId } = req.params;

      let invalidParams = [];

      if (!userId) {
        invalidParams.push("userId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      let expenses = await ExpenseModel.getAllExpenses(userId);
      let amount = 0;

      if (expenses) {
        for (let i = 0; i < expenses.length; i++) {
          amount += expenses[i].amount;
        }
        return res.sendResponse({
          success: true,
          message: "Expenses Retrived",
          data: amount,
        });

        //For monthly value
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Expense", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
   * Function: getAllIncomesTotal
   * Url Parameters: userId
   */
  static async getAllIncomesTotal(req, res) {
    try {
      const { userId } = req.params;

      let invalidParams = [];

      if (!userId) {
        invalidParams.push("userId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      let incomes = await IncomeModel.getAllIncomes(userId);
      let amount = 0;

      if (incomes) {
        for (let i = 0; i < incomes.length; i++) {
          amount += incomes[i].amount;
        }
        return res.sendResponse({
          success: true,
          message: "Incomes Retrived",
          data: amount,
        });

        //For monthly value
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
   * Function: getAllExpenses
   * Url Parameters: userId
   */
  static async getAllExpenses(req, res) {
    try {
      const { userId } = req.params;

      let invalidParams = [];

      if (!userId) {
        invalidParams.push("userId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      let expenses = await DashboardModel.getAllExpenses(userId);

      let expenseResult = [];

      if (expenses) {
        for (let i = 0; i < expenses.length; i++) {
          expenseResult.push({
            title: expenses[i].title,
            amount: expenses[i].amount,
            dateOfExpense: expenses[i].dateOfExpense,
            paymentMethod: expenses[i].paymentMethod,
          });
        }
        return res.sendResponse({
          success: true,
          message: "Expenses Retrived",
          data: expenseResult,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Expense", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
   * Function: getAllIncomes
   * Url Parameters: userId
   */
  static async getAllIncomes(req, res) {
    try {
      const { userId } = req.params;

      let invalidParams = [];

      if (!userId) {
        invalidParams.push("userId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      let incomes = await DashboardModel.getAllIncomes(userId);

      let incomeResult = [];

      if (incomes) {
        for (let i = 0; i < incomes.length; i++) {
          incomeResult.push({
            title: incomes[i].title,
            amount: incomes[i].amount,
            dateOfExpense: incomes[i].dateOfExpense,
            paymentMethod: incomes[i].paymentMethod,
          });
        }
        return res.sendResponse({
          success: true,
          message: "Expenses Retrived",
          data: incomeResult,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
   * Function: getSavings
   * Url Parameters: userId
   */
  static async getSavings(req, res) {
    console.log("Inside dashboard controller");
    try {
      const { userId } = req.params;

      let invalidParams = [];

      if (!userId) {
        invalidParams.push("userId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      let incomes_income = await IncomeModel.getAllIncomes(userId);
      let amount_income = 0;

      let expenses_income = await ExpenseModel.getAllExpenses(userId);
      let amount_expense = 0;

      if (expenses_income) {
        for (let i = 0; i < expenses_income.length; i++) {
          amount_expense += expenses_income[i].amount;
        }
      } else {
        return res.sendError(new Exception("GeneralError"));
      }

      if (incomes_income) {
        for (let i = 0; i < incomes_income.length; i++) {
          amount_income += incomes_income[i].amount;
        }

        //For monthly value
      } else {
        return res.sendError(new Exception("GeneralError"));
      }

      return res.sendResponse({
        success: true,
        message: "Incomes Retrived",
        data: amount_income - amount_expense,
      });
    } catch (error) {
      console.error("Error in getting all Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
   * Function: getAllExpensesDetails
   * Url Parameters: userId
   */
  static async getAllExpensesDetails(req, res) {
    try {
      const { userId } = req.params;

      let invalidParams = [];

      if (!userId) {
        invalidParams.push("userId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      let expenses = await DashboardModel.getAllExpensesDetails(userId);
      const categories = await ExpenseModel.getAllExpenseCategories(userId);

      let expenseResult = [];

      if (expenses) {
        for (let i = 0; i < expenses.length; i++) {
          let categoryName = categories.find(
            (x) => x._id.toString() === expenses[i].categoryId.toString()
          ).name;
          expenseResult.push({
            _id: expenses[i]._id,
            title: expenses[i].title,
            amount: expenses[i].amount,
            dateOfExpense: expenses[i].dateOfExpense,
            paymentMethod: expenses[i].paymentMethod,
            categoryId: expenses[i].categoryId,
            categoryName: categoryName,
            userId: expenses[i].userId,
          });
        }
        return res.sendResponse({
          success: true,
          message: "Expenses Retrived",
          data: expenseResult,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Expense", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }
}

module.exports = DashboardController;
