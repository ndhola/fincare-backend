const moment = require("moment");
const Exception = require("../lib/exceptions");
const ExpenseModel = require("../model/expense.model");

class ReportsController {

  /**
     * Function: Get Data by month
     * Url Parameters: userId
     * Body Parameters: month, year
     * Logic:
        - Get start of given month
        - Get end of given month
        - Get expense data between start and end of given month
        - Get all expense categories for current user
        - Map category name and id with expense data
        - Return expense data
     */
  static async getDataByMonth(req, res) {
    try {
      let { month, year } = req.body;
      const { userId } = req.params;

      let invalidParams = [];

      if (!month || month > 12 || month < 1) {
        invalidParams.push("month");
      }
      if (!year) {
        invalidParams.push("year");
      }
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

      // Get start and end of given month
      const startDate = moment([year, month - 1]).unix() * 1000;
      const endDate =
        moment([year, month - 1])
          .endOf("month")
          .unix() * 1000;

      const expenseResult = await ExpenseModel.getExpensesByDateRange(
        userId,
        startDate,
        endDate
      );
      const categories = await ExpenseModel.getAllExpenseCategories(userId);

      let expenseMap = new Map();

      expenseResult.forEach((expense) => {
        if (expenseMap.has(expense.categoryId)) {
          expenseMap.set(
            expense.categoryId,
            expenseMap.get(expense.categoryId) + expense.amount
          );
        } else {
          expenseMap.set(expense.categoryId, expense.amount);
        }
      });

      let resultObject = {};

      // Mapping of categories with expense data
      expenseMap.forEach((value, key) => {
        let categoryName = categories.find(
          (x) => x._id.toString() === key.toString()
        ).name;
        resultObject[categoryName] = value;
      });

      if (expenseResult) {
        return res.sendResponse({
          success: true,
          message: "Report result retrieved",
          data: resultObject,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getDataByMonth", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
     * Function: Get Last Five Month's Data
     * Url Parameters: userId
     * Logic:
        - Get start of current month
        - Get end of current month
        - Get expense data between start and end of current month
        - Similarly, get data for last four months
        - Map data with month number
        - Calculate total expense for each month
        - Return that mapped expense data
     */
  static async getLastFiveMonthData(req, res) {
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

      let functionCalls = [];
      let results = {};
      const fetchExpenses = async (startDate, endDate, monthName) => {
        const expenseData = await ExpenseModel.getExpensesByDateRange(
          userId,
          startDate,
          endDate
        );
        results[monthName] = expenseData;
      };

      // Function call for data between Start and end of the current month
      let startDate = moment().startOf("month").unix() * 1000;
      let endDate = moment(startDate).endOf("month") * 1000;
      let monthName = moment().format("MM");
      functionCalls.push(fetchExpenses(startDate, endDate, monthName));

      // Function calls for data between Start and end of other four months
      for (let i = 0; i < 4; i++) {
        startDate =
          moment()
            .subtract(i + 1, "months")
            .startOf("month")
            .unix() * 1000;
        endDate =
          moment()
            .subtract(i + 1, "months")
            .endOf("month")
            .unix() * 1000;
        monthName = moment()
          .subtract(i + 1, "months")
          .format("MM");
        functionCalls.push(fetchExpenses(startDate, endDate, monthName));
      }

      // Execute all functions asynchronously
      await Promise.all(functionCalls);

      if (results) {
        // Calculate total expense for each month
        for (const [key, expenses] of Object.entries(results)) {
          let totalAmount = 0;
          expenses.forEach((expense) => {
            totalAmount += expense.amount;
          });
          results[key] = totalAmount;
        }
        return res.sendResponse({
          success: true,
          message: "Report result retrieved",
          data: results,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getLastFiveMonthData", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  /**
     * Function: Get Last Ten Days' Data
     * Url Parameters: userId
     * Logic:
        - Get start of current day
        - Get end of current day
        - Get expense data between start and end of current day
        - Similarly, get data for last ten days
        - Map data with date
        - Calculate total expense for each date
        - Return that mapped expense data
     */
  static async getLastTenDaysData(req, res) {
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

      let functionCalls = [];
      let results = {};
      const fetchExpenses = async (startDate, endDate, date) => {
        const expenseData = await ExpenseModel.getExpensesByDateRange(
          userId,
          startDate,
          endDate
        );
        results[date] = expenseData;
      };

      // Function call for data between Start and end of the current day
      let startDate = moment().startOf("day").unix() * 1000;
      let endDate = moment().endOf("day").unix() * 1000;
      let date = startDate;
      functionCalls.push(fetchExpenses(startDate, endDate, date));

      // Function calls for data between Start and end of other nine days
      for (let i = 0; i < 9; i++) {
        startDate =
          moment()
            .subtract(i + 1, "days")
            .startOf("day")
            .unix() * 1000;
        endDate =
          moment()
            .subtract(i + 1, "days")
            .endOf("day")
            .unix() * 1000;
        date = startDate;
        functionCalls.push(fetchExpenses(startDate, endDate, date));
      }

      await Promise.all(functionCalls);

      if (results) {
        // Calculate total expense for each month
        for (const [key, expenses] of Object.entries(results)) {
          let totalAmount = 0;
          expenses.forEach((expense) => {
            totalAmount += expense.amount;
          });
          results[key] = totalAmount;
        }
        return res.sendResponse({
          success: true,
          message: "Report result retrieved",
          data: results,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getLastTenDaysData", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

}

module.exports = ReportsController;
