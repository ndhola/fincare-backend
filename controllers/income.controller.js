const Exception = require("../lib/exceptions");
const IncomeModel = require("../model/income.model");

class IncomeController {
  static async createIncome(req, res) {
    try {
      const { title, categoryId, amount, dateOfIncome, paymentMethod, userId } =
        req.body;

      let invalidParams = [];

      if (!title) {
        invalidParams.push("title");
      }
      if (!categoryId) {
        invalidParams.push("categoryId");
      }
      if (!amount) {
        invalidParams.push("amount");
      }
      if (!dateOfIncome) {
        invalidParams.push("dateOfIncome");
      }
      if (!paymentMethod) {
        invalidParams.push("paymentMethod");
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

      const createResult = await IncomeModel.createIncome(
        title,
        amount,
        dateOfIncome,
        paymentMethod,
        categoryId,
        userId
      );

      if (createResult) {
        return res.sendResponse({
          success: true,
          message: "Income added",
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in creating Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  static async editIncome(req, res) {
    try {
      const { id } = req.params;
      const { title, categoryId, amount, dateOfIncome, paymentMethod, userId } =
        req.body;

      let invalidParams = [];

      if (!id) {
        invalidParams.push("id");
      }
      if (!title) {
        invalidParams.push("title");
      }
      if (!categoryId) {
        invalidParams.push("categoryId");
      }
      if (!amount) {
        invalidParams.push("amount");
      }
      if (!dateOfIncome) {
        invalidParams.push("dateOfIncome");
      }
      if (!paymentMethod) {
        invalidParams.push("paymentMethod");
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

      const editResult = await IncomeModel.editIncome(
        id,
        title,
        amount,
        dateOfIncome,
        paymentMethod,
        categoryId,
        userId
      );

      if (editResult) {
        return res.sendResponse({
          success: true,
          message: "Income edited",
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in editing Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  static async getAllIncome(req, res) {
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

      let Incomes = await IncomeModel.getAllIncomes(userId);
      const categories = await IncomeModel.getAllIncomeCategories(userId);

      let IncomeResult = [];

      if (Incomes) {
        for (let i = 0; i < Incomes.length; i++) {
          let categoryName = categories.find(
            (x) => x._id.toString() === Incomes[i].categoryId.toString()
          ).name;
          IncomeResult.push({
            _id: Incomes[i]._id,
            title: Incomes[i].title,
            amount: Incomes[i].amount,
            dateOfIncome: Incomes[i].dateOfIncome,
            paymentMethod: Incomes[i].paymentMethod,
            categoryId: Incomes[i].categoryId,
            categoryName: categoryName,
            userId: Incomes[i].userId,
          });
        }
        return res.sendResponse({
          success: true,
          message: "Incomes Retrived",
          data: IncomeResult,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  static async deleteIncome(req, res) {
    try {
      const { IncomeId } = req.params;

      let invalidParams = [];

      if (!IncomeId) {
        invalidParams.push("IncomeId");
      }

      if (invalidParams.length) {
        return res.sendError(
          new Exception(
            "MissingParameter",
            "Parameters missing: " + invalidParams.join(",")
          )
        );
      }

      const deleteResult = await IncomeModel.deleteIncome(IncomeId);

      if (deleteResult) {
        return res.sendResponse({
          success: true,
          message: "Income deleted",
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }

      return res.sendResponse({
        success: true,
        message: "Income Deleted",
      });
    } catch (error) {
      console.error("Error in deleting Income", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  static async createIncomeCategory(req, res) {
    try {
      const { name, userId } = req.body;

      let invalidParams = [];

      if (!name) {
        invalidParams.push("name");
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

      const createResult = await IncomeModel.createIncomeCategory(name, userId);

      if (createResult) {
        return res.sendResponse({
          success: true,
          message: "Income Category added",
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in creating Income Category", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }

  static async getAllIncomeCategory(req, res) {
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

      const Incomes = await IncomeModel.getAllIncomeCategories(userId);

      if (Incomes) {
        return res.sendResponse({
          success: true,
          message: "Income Categories Retrived",
          data: Incomes,
        });
      } else {
        return res.sendError(new Exception("GeneralError"));
      }
    } catch (error) {
      console.error("Error in getting all Income Categories", error);
      return res.sendError(new Exception("GeneralError"));
    }
  }
}

module.exports = IncomeController;
