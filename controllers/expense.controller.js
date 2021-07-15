const Exception = require('../lib/exceptions');
const ExpenseModel = require('../model/expense.model');

class ExpenseController {

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

            const expenses = await ExpenseModel.getAllExpenses(userId);

            if(expenses){
                return res.sendResponse({
                    success: true,
                    message: 'Expenses Retrived',
                    data: expenses
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in getting all Expense', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

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