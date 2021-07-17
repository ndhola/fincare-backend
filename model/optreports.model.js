const OptReportsSchema = require('../mongo-models/opt_reports');

class OptreportsModel{
    static async createOptreports(user_id, user_email, is_opted){
        try {
            await new OptReportsSchema().optreports.create({
                user_id,
                user_email,
                is_opted
            });
            return true;

        } catch (error) {
            console.error('Error while creating optreports entry', error);
            return false;
        }
    }

    static async editOptreports(user_id, user_email, is_opted){
        try {
            await new OptReportsSchema().optreports.findOneAndUpdate({user_id: user_id},{
                user_id,
                user_email,
                is_opted
            });
            return true;

        } catch (error) {
            console.error('Error while updating optreports entry', error);
            return false;
        }
    }

    static async getAllOptreports(){
        try {
            let optreports = await new OptReportsSchema().optreports.find({});
            return optreports;

        } catch (error) {
            console.error('Error while getting opt reports', error);
            return null;
        }
    }

    static async getOptreports(user_id){
        try {
            let optreports = await new OptReportsSchema().optreports.find({user_id});
            return optreports;

        } catch (error) {
            console.error('Error while getting opt reports', error);
            return null;
        }
    }
}
module.exports = OptreportsModel;