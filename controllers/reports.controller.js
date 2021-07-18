const moment = require('moment');
const Exception = require('../lib/exceptions');
const ExpenseModel = require('../model/expense.model');

class ReportsController {

    static async getDataByMonth(req, res) {
        try {
            let {month, year} = req.body;
            const {userId} = req.params;

            let invalidParams = [];

            if(!month || month > 12 || month < 1){
                invalidParams.push('month');
            }
            if(!year){
                invalidParams.push('year');
            }
            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            const startDate = moment([year,month-1]).unix() * 1000;
            const endDate = moment([year,month-1]).endOf('month').unix()* 1000;

            const expenseResult = await ExpenseModel.getExpensesByDateRange(userId,startDate,endDate);
            const categories = await ExpenseModel.getAllExpenseCategories(userId);

            let expenseMap = new Map();

            expenseResult.forEach(expense => {
                if (expenseMap.has(expense.categoryId)){
                    expenseMap.set(expense.categoryId,expenseMap.get(expense.categoryId)+expense.amount);
                } else {
                    expenseMap.set(expense.categoryId,expense.amount);
                }
            });

            let resultObject = {};

            expenseMap.forEach((value,key)=>{
                let categoryName = (categories.find(x => x._id.toString() === key.toString())).name;
                resultObject[categoryName] = value;
            })

            if(expenseResult){
                return res.sendResponse({
                    success: true,
                    message: 'Report result retrieved',
                    data: resultObject
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in getDataByMonth', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getLastFiveMonthData(req, res) {
        try {
            const {userId} = req.params;

            let invalidParams = [];

            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            let functionCalls = [];
            let results = {};
            const fetchExpenses = async (startDate, endDate, monthName) => {
                const expenseData = await ExpenseModel.getExpensesByDateRange(userId,startDate,endDate);
                results[monthName]=expenseData;
            }

            let startDate = moment().startOf('month').unix() * 1000;
            let endDate = moment(startDate).endOf('month') * 1000;
            let monthName = moment().format('MM');
            functionCalls.push(fetchExpenses(startDate,endDate,monthName));

            for(let i=0;i<4;i++){
                startDate = moment().subtract(i+1,'months').startOf('month').unix() * 1000;
                endDate = moment().subtract(i+1,'months').endOf('month').unix() * 1000;
                monthName = moment().subtract(i+1,'months').format('MM');
                functionCalls.push(fetchExpenses(startDate,endDate,monthName));
            }

            await Promise.all(functionCalls);

            if(results){
                for (const [key, expenses] of Object.entries(results)) {
                    let totalAmount = 0;
                    expenses.forEach(expense=>{
                        totalAmount+=expense.amount;
                    });
                    results[key]=totalAmount;
                }
                return res.sendResponse({
                    success: true,
                    message: 'Report result retrieved',
                    data: results
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in getLastFiveMonthData', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getLastTenDaysData(req, res) {
        try {
            const {userId} = req.params;

            let invalidParams = [];

            if(!userId){
                invalidParams.push('userId');
            }

            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            let functionCalls = [];
            let results = {};
            const fetchExpenses = async (startDate, endDate, date) => {
                const expenseData = await ExpenseModel.getExpensesByDateRange(userId,startDate,endDate);
                results[date]=expenseData;
            }

            let startDate = moment().startOf('day').unix() * 1000;
            let endDate = moment().endOf('day').unix() * 1000;
            let date = startDate;
            functionCalls.push(fetchExpenses(startDate,endDate,date));

            for(let i=0;i<9;i++){
                startDate = moment().subtract(i+1,'days').startOf('day').unix() * 1000;
                endDate = moment().subtract(i+1,'days').endOf('day').unix() * 1000;
                date = startDate
                functionCalls.push(fetchExpenses(startDate,endDate,date));
            }

            await Promise.all(functionCalls);

            if(results){
                for (const [key, expenses] of Object.entries(results)) {
                    let totalAmount = 0;
                    expenses.forEach(expense=>{
                        totalAmount+=expense.amount;
                    });
                    results[key]=totalAmount;
                }
                return res.sendResponse({
                    success: true,
                    message: 'Report result retrieved',
                    data: results
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error in getLastTenDaysData', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = ReportsController;