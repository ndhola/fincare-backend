const Exception = require("../lib/exceptions");
const ExpenseModel = require("../model/expense.model");
const DashboardModel = require("../model/dashboard.model");

class DashboardController {
  static async getAllExpensesTotal(req, res) {
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
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Expense", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

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
