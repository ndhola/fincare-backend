const Exception = require('../lib/exceptions');
const OptreportsModel = require('../model/optreports.model');

class OptreportsController {

    /* Simple API for healthcheck */
    static async ping(req, res) {
        return res.sendResponse({
            success: true,
            message: 'Pong'
        });
    }

    static async createOptreports(req, res) {
        try {
            const {user_id, user_email, is_opted} = req.body;
            let invalidParams = [];
            if (!user_id) {
                invalidParams.push('user_id');
            }
            if (!user_email) {
                invalidParams.push('user_email');
            }
            if (req.body.is_opted === undefined) {
                invalidParams.push('is_opted');
            }

            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            const createResult = await OptreportsModel.createOptreports(user_id, user_email, is_opted);

            if (createResult) {
                return res.sendResponse({
                    success: true,
                    message: 'Opt report subscription choice for the user created'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }
        } catch (error) {
            console.error('Error while creating opt report subscription', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async editOptreports(req, res) {
        try {
            const {user_id} = req.params;
            const {user_email, is_opted} = req.body;

            let invalidParams = [];

            if (!user_id) {
                invalidParams.push('user_id');
            }
            if (!user_email) {
                invalidParams.push('user_email');
            }
            if (req.body.is_opted === undefined) {
                invalidParams.push('is_opted');
            }

            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            const editResult = await OptreportsModel.editOptreports(user_id, user_email, is_opted);

            if (editResult) {
                return res.sendResponse({
                    success: true,
                    message: 'Opt report choice updated in the DB'
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }

        } catch (error) {
            console.error('Error while updating opt report choice', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getAllOptReports(req, res) {
        try {
            let optreports = await OptreportsModel.getAllOptreports();
            let optreportsResult = [];

            if (optreports) {
                for (let i = 0; i < optreports.length; i++) {
                    optreportsResult.push({
                        _id: optreports[i]._id,
                        user_id: optreports[i].user_id,
                        user_email: optreports[i].user_email,
                        is_opted: optreports[i].is_opted
                    })
                }
                return res.sendResponse({
                    success: true,
                    message: 'Opt report for all users retrieved',
                    data: optreportsResult
                });
            } else {
                return res.sendError(new Exception('GeneralError'));
            }
        } catch (error) {
            console.error('Error while fetching opt report for the user', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }

    static async getOptReports(req, res) {
        try {
            const {user_id} = req.params;
            let invalidParams = [];

            if (!user_id) {
                invalidParams.push('user_id');
            }

            if (invalidParams.length) {
                return res.sendError(new Exception('MissingParameter', 'Parameters missing: ' + invalidParams.join(',')));
            }

            let optreports = await OptreportsModel.getOptreports(user_id);

            if (optreports.length > 0) {
                const optreportsResult = {
                    user_id: optreports[0].user_id,
                    user_email: optreports[0].user_email,
                    is_opted: optreports[0].is_opted,
                }
                return res.sendResponse({
                    success: true,
                    message: 'Opt report for the user retrieved',
                    data: optreportsResult
                });
            } else {
                /*
                If the opt report is not present in the mongo db,
                then it will be false by default. Hence, return false
                in such case.
                 */
                const optreportsResult = {
                    user_id: user_id,
                    user_email: "<NA>",
                    is_opted: false,
                }
                return res.sendResponse({
                    success: true,
                    message: 'Opt report for the user retrieved',
                    data: optreportsResult
                });
            }
        } catch (error) {
            console.error('Error while fetching opt report for the user', error);
            return res.sendError(new Exception('GeneralError'));
        }
    }
}

module.exports = OptreportsController;