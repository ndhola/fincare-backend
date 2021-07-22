/**
 * Author: Dhruv Bharatbhai Patel
 * Banner Id: B00868931
 */
const IncomeSchema = require("../mongo-models/income");
const IncomeCategorySchema = require("../mongo-models/incomeCategory");

class IncomeModel {
  /**
   * Function:- Create Income
   * @param title
   * @param amount
   * @param dateOfIncome
   * @param paymentMethod
   * @param categoryId
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for create income
   */
  static async createIncome(
    title,
    amount,
    dateOfIncome,
    paymentMethod,
    categoryId,
    userId
  ) {
    try {
      await new IncomeSchema().income.create({
        title,
        amount,
        dateOfIncome,
        paymentMethod,
        categoryId,
        userId,
      });
      return true;
    } catch (error) {
      console.error("Error in model create Income", error);
      return false;
    }
  }

  /**
   * Function:- Edit Income
   * @param id
   * @param title
   * @param amount
   * @param dateOfIncome
   * @param paymentMethod
   * @param categoryId
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for update income
   */
  static async editIncome(
    id,
    title,
    amount,
    dateOfIncome,
    paymentMethod,
    categoryId,
    userId
  ) {
    try {
      await new IncomeSchema().income.findOneAndUpdate(
        { _id: id },
        {
          title,
          amount,
          dateOfIncome,
          paymentMethod,
          categoryId,
          userId,
        }
      );
      return true;
    } catch (error) {
      console.error("Error in model edit Income", error);
      return false;
    }
  }

  /**
   * Function:- Get all Incomes
   * @param userId
   * @returns {Promise<*|null>}
   *
   * Description: Database call for get incomes by userId
   */
  static async getAllIncomes(userId) {
    try {
      let Incomes = await new IncomeSchema().income.find({ userId });
      return Incomes;
    } catch (error) {
      console.error("Error in model getAll Income", error);
      return null;
    }
  }

  /**
   * Function:- Delete Income
   * @param IncomeId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for delete income by incomeId
   */
  static async deleteIncome(IncomeId) {
    try {
      await new IncomeSchema().income.deleteOne({ _id: incomeId });
      return true;
    } catch (error) {
      console.error("Error in model delete Income", error);
      return false;
    }
  }

  /**
   * Function:- Create Income Category
   * @param name
   * @param userId
   * @returns {Promise<boolean>}
   *
   * Description: Database call for inserting income category
   */
  static async createIncomeCategory(name, userId) {
    try {
      await new IncomeCategorySchema().incomeCategory.create({
        name,
        userId,
      });
      return true;
    } catch (error) {
      console.error("Error in model create Income Category", error);
      return false;
    }
  }

  /**
   * Function:- Get All Income Categories
   * @param userId
   * @returns {Promise<*|null>}
   *
   * Description: Database call for querying income category
   */
  static async getAllIncomeCategories(userId) {
    try {
      const IncomeCategories =
        await new IncomeCategorySchema().incomeCategory.find({ userId });
      return IncomeCategories;
    } catch (error) {
      console.error("Error in model getAll Income Category", error);
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
   * Description: Database call for income data
   */
  static async getIncomesByDateRange(userId, startDate, endDate) {
    try {
      const Incomes = await new IncomeSchema().Income.find({
        userId,
        dateOfIncome: { $gte: startDate, $lte: endDate },
      });
      return Incomes;
    } catch (error) {
      console.error("Error in model getIncomesByDateRange", error);
      return null;
    }
  }
}
module.exports = IncomeModel;
