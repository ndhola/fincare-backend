const EmiDatesSchema = require('../mongo-models/emi_dates');

class EmidatesModel{
    static async createEmiDates(user_id, user_email, emi_id, emi_name, emi_amount, emi_due_day, is_active){
        try {
            await new EmiDatesSchema().emidates.create({
                user_id,
                user_email,
                emi_id,
                emi_name,
                emi_amount,
                emi_due_day,
                is_active
            });
            return true;

        } catch (error) {
            console.error('Error while creating emidates entry', error);
            return false;
        }
    }

    static async editEmiDates(user_id, user_email, emi_id, emi_name, emi_amount, emi_due_day, is_active){
        try {
            await new EmiDatesSchema().emidates.findOneAndUpdate({emi_id: emi_id},{
                user_id,
                user_email,
                emi_id,
                emi_name,
                emi_amount,
                emi_due_day,
                is_active
            });
            return true;

        } catch (error) {
            console.error('Error while updating emidates entry', error);
            return false;
        }
    }

    static async getEmiDates(user_id){
        try {
            let emidates = await new EmiDatesSchema().emidates.find({user_id});
            return emidates;

        } catch (error) {
            console.error('Error while getting emidates', error);
            return null;
        }
    }

    static async getAllEmiDates(){
        try {
            let emidates = await new EmiDatesSchema().emidates.find({});
            return emidates;

        } catch (error) {
            console.error('Error while getting emidates', error);
            return null;
        }
    }

    static async deleteEmiDate(emi_id){
        try {
            await new EmiDatesSchema().emidates.deleteOne({emi_id: emi_id});
            return true;

        } catch (error) {
            console.error('Error while deleting emi dates entry', error);
            return false;
        }
    }
}
module.exports = EmidatesModel;