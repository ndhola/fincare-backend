const Exception = require("../lib/exceptions");
const ExpenseModel = require("../model/expense.model");

class DashboardController {
  static async getAllExpenseTotal(req, res) {
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
}

module.exports = DashboardController;
