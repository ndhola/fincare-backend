/**
 * Author: Kirtan Revinbhai Dudhatra
 * Banner Id: B00863410
 */
const Exception = require('../lib/exceptions');
const ExpenseModel = require('../model/expense.model');

class ExpenseController {

    /**
     * Function: Create Expense
     * Body Parameters: title, categoryId, amount, dateOfExpense, paymentMethod, userId
     */
    static async createExpense(req, res) {
        try {
            const {title, categoryId, amount, dateOfExpense, paymentMethod, userId} = req.body;

            let invalidParams = [];

            if(!title){
                invalidParams.push('title');
            }
            if(!categoryId){
                invalidParams.push('categoryId');
            }
            if(!amount){
                invalidParams.push('amount');
            }
            if(!dateOfExpense){
                invalidParams.push('dateOfExpense');
            }
            if(!paymentMethod){
                invalidParams.push('paymentMethod');
            }
            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            const createResult = await ExpenseModel.createExpense(title,amount,dateOfExpense,paymentMethod,categoryId,userId);

            if(createResult){
                return res.sendResponse({
                    success: true,
                    message: 'Expense added'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in creating Expense', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    /**
     * Function: Edit Expense
     * Url Parameters: id
     * Body Parameters: title, categoryId, amount, dateOfExpense, paymentMethod, userId
     */
    static async editExpense(req, res) {
        try {
            const {id} = req.params;
            const {title, categoryId, amount, dateOfExpense, paymentMethod, userId} = req.body;

            let invalidParams = [];

            if(!id){
                invalidParams.push('id');
            }
            if(!title){
                invalidParams.push('title');
            }
            if(!categoryId){
                invalidParams.push('categoryId');
            }
            if(!amount){
                invalidParams.push('amount');
            }
            if(!dateOfExpense){
                invalidParams.push('dateOfExpense');
            }
            if(!paymentMethod){
                invalidParams.push('paymentMethod');
            }
            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            const editResult = await ExpenseModel.editExpense(id,title,amount,dateOfExpense,paymentMethod,categoryId,userId);

            if(editResult){
                return res.sendResponse({
                    success: true,
                    message: 'Expense edited'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in editing Expense', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    /**
     * Function: Get All Expense
     * Url Parameters: userId
     * Logic:
     - Get all expense of user
     - Get all expense categories
     - Map category names with categories of expenses
     - Get all expense categories for current user
     - Map category name and id with expense data
     */
    static async getAllExpense(req, res) {
        try {
            const {userId} = req.params;

            let invalidParams = [];

            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            let expenses = await ExpenseModel.getAllExpenses(userId);
            const categories = await ExpenseModel.getAllExpenseCategories(userId);

            let expenseResult = [];

            if(expenses){
                // Map Categorynames with expenses
                for(let i=0;i<expenses.length;i++){
                    let categoryName = (categories.find(x => x._id.toString() === expenses[i].categoryId.toString())).name;
                    expenseResult.push({
                        _id: expenses[i]._id,
                        title: expenses[i].title,
                        amount: expenses[i].amount,
                        dateOfExpense: expenses[i].dateOfExpense,
                        paymentMethod: expenses[i].paymentMethod,
                        categoryId: expenses[i].categoryId,
                        categoryName: categoryName,
                        userId: expenses[i].userId
                    })
                }
                return res.sendResponse({
                    success: true,
                    message: 'Expenses Retrived',
                    data: expenseResult
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in getting all Expense', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    /**
     * Function: Delete Expense
     * Url Parameters: expenseId
     */
    static async deleteExpense(req, res) {
        try {
            const {expenseId} = req.params;

            let invalidParams = [];

            if(!expenseId){
                invalidParams.push('expenseId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            const deleteResult = await ExpenseModel.deleteExpense(expenseId);

            if(deleteResult){
                return res.sendResponse({
                    success: true,
                    message: 'Expense deleted'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

            return res.sendResponse({
                success: true,
                message: 'Expense Deleted'
            });

        } catch (error) {
            console.error('Error in deleting Expense', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    /**
     * Function: Create Expense Category
     * Body Parameters: name, userId
     */
    static async createExpenseCategory(req, res) {
        try {
            const {name, userId} = req.body;

            let invalidParams = [];

            if(!name){
                invalidParams.push('name');
            }
            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            const createResult = await ExpenseModel.createExpenseCategory(name,userId);

            if(createResult){
                return res.sendResponse({
                    success: true,
                    message: 'Expense Category added'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in creating Expense Category', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    /**
     * Function: Create All Expense Category
     * Url Parameters: userId
     */
    static async getAllExpenseCategory(req, res) {
        try {
            const {userId} = req.params;

            let invalidParams = [];

            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            const expenses = await ExpenseModel.getAllExpenseCategories(userId);

            if(expenses){
                return res.sendResponse({
                    success: true,
                    message: 'Expense Categories Retrived',
                    data: expenses
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in getting all Expense Categories', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = ExpenseController;