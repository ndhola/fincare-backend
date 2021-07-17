const IncomeSchema = require("../mongo-models/income");
const IncomeCategorySchema = require("../mongo-models/incomeCategory");

class IncomeModel {
  static async createIncome(
    title,
    amount,
    dateOfIncome,
    paymentMethod,
    categoryId,
    userId
  ) {
    try {
      await new IncomeSchema().Income.create({
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
      await new IncomeSchema().Income.findOneAndUpdate(
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

  static async getAllIncomes(userId) {
    try {
      let Incomes = await new IncomeSchema().Income.find({ userId });
      return Incomes;
    } catch (error) {
      console.error("Error in model getAll Income", error);
      return null;
    }
  }

  static async deleteIncome(IncomeId) {
    try {
      await new IncomeSchema().Income.deleteOne({ _id: IncomeId });
      return true;
    } catch (error) {
      console.error("Error in model delete Income", error);
      return false;
    }
  }

  static async createIncomeCategory(name, userId) {
    try {
      await new IncomeCategorySchema().IncomeCategory.create({
        name,
        userId,
      });
      return true;
    } catch (error) {
      console.error("Error in model create Income Category", error);
      return false;
    }
  }

  static async getAllIncomeCategories(userId) {
    try {
      const IncomeCategories =
        await new IncomeCategorySchema().IncomeCategory.find({ userId });
      return IncomeCategories;
    } catch (error) {
      console.error("Error in model getAll Income Category", error);
      return null;
    }
  }

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
