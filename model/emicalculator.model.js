/**
 * Author: Jemis Rameshbhai Zadafiya (B00873589)
 * Description: It calculates Monthly EMI, Total Interest and Total Payment of Loan. calculateEmi function takes four parameter amount, interestRate, and period as parameters from fonrt end.
 */
const ExpenseSchema = require('../mongo-models/expense');
const ExpenseCategorySchema = require('../mongo-models/expenseCategory');

class EmiCalculatorModel{
    static async calculateEmi(loanCategory, amount, interestRate, period){
        let emiresponse = {}

        try {

            var r = interestRate/(100*12);
            var n = period*12;
            var c = (1+r)**n;
            var emi= amount*r*c/(c - 1);
            var totalPayment = emi*n;
            var totalInterest = totalPayment - amount;
            
            emiresponse['monthlyEMI'] = emi
            emiresponse['totalInterest'] = totalInterest
            emiresponse['totalPayment'] = totalPayment
            
            return emiresponse

        } catch (error) {
            console.error('Error in model create Expense', error);
            return false;
        }
    }

    
}
module.exports = EmiCalculatorModel;