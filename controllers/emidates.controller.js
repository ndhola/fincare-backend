const Exception = require('../lib/exceptions');
const EmidatesModel = require('../model/emidates.model');
const Utils = require('../lib/Utils');

class EmidatesController {

    /* Simple API for healthcheck */
    static async ping(req, res) {
        return res.sendResponse({
            success: true,
            message: 'Pong'
        });
    }

    static async createEmidates(req, res) {
        try {
            const {user_id, user_email, emi_name, emi_amount, emi_due_day} = req.body;
            let invalidParams = [];
            if (!user_id) {
                invalidParams.push('user_id');
            }
            if (!user_email) {
                invalidParams.push('user_email');
            }
            if (!emi_name) {
                invalidParams.push('emi_name');
            }
            if (!emi_amount) {
                invalidParams.push('emi_amount');
            }
            if (!emi_due_day) {
                invalidParams.push('emi_due_day');
            }
            const emi_id = await Utils.generateId(10);
            const is_active = true;
            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            const createResult = await EmidatesModel.createEmiDates(user_id, user_email, emi_id, emi_name, emi_amount, emi_due_day, is_active);

            if (createResult) {
                return res.sendResponse({
                    success: true,
                    message: 'EMI Dates created'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }
        } catch (error) {
            console.error('Error while creating emi dates', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async editEmidates(req, res) {
        try {
            const {emi_id} = req.params;
            const {user_id, user_email, emi_name, emi_amount, emi_due_day, is_active} = req.body;

            let invalidParams = [];

            if (!user_id) {
                invalidParams.push('user_id');
            }
            if (!user_email) {
                invalidParams.push('user_email');
            }
            if (!emi_name) {
                invalidParams.push('emi_name');
            }
            if (!emi_amount) {
                invalidParams.push('emi_amount');
            }
            if (!emi_due_day) {
                invalidParams.push('emi_due_day');
            }
            if(req.body.is_active === undefined) {
                invalidParams.push('is_active');
            }

            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            const editResult = await EmidatesModel.editEmiDates(user_id, user_email, emi_id, emi_name, emi_amount, emi_due_day, is_active);

            if (editResult) {
                return res.sendResponse({
                    success: true,
                    message: 'EMI dates updated'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error while updating emi dates', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getEmidates(req, res) {
        try {
            const {user_id} = req.params;
            let invalidParams = [];

            if (!user_id) {
                invalidParams.push('user_id');
            }

            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            let emidates = await EmidatesModel.getEmiDates(user_id);
            let emidatesResult = [];

            if (emidates) {
                for (let i = 0; i < emidates.length; i++) {
                    emidatesResult.push({
                        _id: emidates[i]._id,
                        user_id: emidates[i].user_id,
                        user_email: emidates[i].user_email,
                        emi_id: emidates[i].emi_id,
                        emi_name: emidates[i].emi_name,
                        emi_amount: emidates[i].emi_amount,
                        emi_due_day: emidates[i].emi_due_day,
                    })
                }
                return res.sendResponse({
                    success: true,
                    message: 'EMI dates for the specified user retrived',
                    data: emidatesResult
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error while fetching emi dates', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getAllEmidates(req, res) {
        try {
            let emidates = await EmidatesModel.getAllEmiDates();
            let emidatesResult = [];

            if (emidates) {
                for (let i = 0; i < emidates.length; i++) {
                    emidatesResult.push({
                        _id: emidates[i]._id,
                        user_id: emidates[i].user_id,
                        user_email: emidates[i].user_email,
                        emi_id: emidates[i].emi_id,
                        emi_name: emidates[i].emi_name,
                        emi_amount: emidates[i].emi_amount,
                        emi_due_day: emidates[i].emi_due_day,
                    })
                }
                return res.sendResponse({
                    success: true,
                    message: 'EMI dates for the specified user retrived',
                    data: emidatesResult
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error while fetching emi dates', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async deleteEmidates(req, res) {
        try {
            const {emi_id} = req.params;

            let invalidParams = [];

            if (!emi_id) {
                invalidParams.push('emi_id');
            }

            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            const deletedResult = await EmidatesModel.deleteEmiDate(emi_id);

            if (deletedResult) {
                return res.sendResponse({
                    success: true,
                    message: 'EMI date entry deleted'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error while deleting emi date entry', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = EmidatesController;