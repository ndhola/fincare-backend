const Exception = require('../lib/exceptions');
const EmiCalculatorModel = require('../model/emicalculator.model');
const ExpenseModel = require('../model/emicalculator.model');

class EmiCalculatorController {

    static async calculateEmi(req, res) {
        try {
            const {loanCategory, amount, interestRate, period} = req.body;

            let invalidParams = [];

            if(!loanCategory){
                invalidParams.push('loanCategory');
            }
            if(!amount){
                invalidParams.push('amount');
            }
            if(!interestRate){
                invalidParams.push('interestRate');
            }
            if(!period){
                invalidParams.push('period');
            }
           
            if(invalidParams.length){
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: '+invalidParams.join(',')));
            }

            let emiModel = await EmiCalculatorModel.calculateEmi(loanCategory, amount, interestRate, period);

            if(emiModel){
                return res.sendResponse({
                    success: true,
                    message: 'successfully calculated EMI',
                    emiModel: emiModel
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }
           

        } catch (error) {
            console.error('Error in calculating EMI', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    
}

module.exports = EmiCalculatorController;